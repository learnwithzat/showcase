/** @format */

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
	throw new Error(
		'Please define the MONGODB_URI environment variable inside .env'
	);
}

interface MongooseCache {
	conn: typeof mongoose | null;
	promise: Promise<typeof mongoose> | null;
}

declare global {
	// eslint-disable-next-line no-var
	var mongoose: MongooseCache | undefined;
}

if (!global.mongoose) {
	global.mongoose = { conn: null, promise: null };
}
const cached = global.mongoose;

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000;

async function connectWithRetry(uri: string, options: mongoose.ConnectOptions) {
	let retries = MAX_RETRIES;
	while (true) {
		try {
			return await mongoose.connect(uri, options);
		} catch (error) {
			retries--;
			if (retries === 0) {
				throw error;
			}
			// eslint-disable-next-line no-console
			console.warn(
				`Failed to connect to MongoDB. Retrying in ${RETRY_DELAY_MS}ms...`
			);
			await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
		}
	}
}

export async function connectToDatabase() {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		const opts: mongoose.ConnectOptions = {
			bufferCommands: false,
			family: 4,
		};

		cached.promise = connectWithRetry(MONGODB_URI!, opts);
	}
	try {
		cached.conn = await cached.promise;
	} catch (e) {
		cached.promise = null;
		throw e;
	}

	return cached.conn;
}
