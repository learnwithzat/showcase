/** @format */

// c:\Latest\2026\Online\showcase\src\models\User.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

// Simple user model for admin. In a real app, use bcrypt for passwords.
export interface IUser extends Document {
	email: string;
	passwordHash: string; // Storing plain text for this demo as requested "simple", but ideally hashed
	role: 'admin' | 'user';
}

const UserSchema: Schema = new Schema({
	email: { type: String, required: true, unique: true },
	passwordHash: { type: String, required: true },
	role: { type: String, default: 'admin' },
});

const User: Model<IUser> =
	mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
