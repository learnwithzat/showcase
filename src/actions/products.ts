/** @format */

// c:\Latest\2026\Online\showcase\src\actions\products.ts
'use server';

import { connectToDatabase } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import Product from '@/models/Product';
import { z } from 'zod';

const productSchema = z.object({
	name: z.string().min(1),
	slug: z.string().min(1),
	description: z.string().min(1),
	price: z.coerce.number().min(0),
	imageUrl: z.string().url(),
	category: z.string().min(1),
	stock: z.coerce.number().min(0),
});

export async function createProduct(prevState: any, formData?: FormData) {
	// If called directly from a server component form action, the first argument is FormData
	const rawFormData = formData || (prevState as FormData);

	const validatedFields = productSchema.safeParse({
		name: rawFormData.get('name'),
		slug: rawFormData.get('slug'),
		description: rawFormData.get('description'),
		price: rawFormData.get('price'),
		imageUrl: rawFormData.get('imageUrl'),
		category: rawFormData.get('category'),
		stock: rawFormData.get('stock'),
	});

	if (!validatedFields.success) {
		return { error: 'Invalid fields', issues: validatedFields.error.issues };
	}

	try {
		await connectToDatabase();
		await Product.create(validatedFields.data);
		revalidatePath('/products');
		revalidatePath('/admin/products');
		revalidatePath('/');
	} catch (error) {
		return { error: 'Failed to create product' };
	}
	redirect('/admin/products');
}

export async function updateProduct(
	id: string,
	prevState: any,
	formData?: FormData
) {
	const rawFormData = formData || (prevState as FormData);

	const validatedFields = productSchema.safeParse({
		name: rawFormData.get('name'),
		slug: rawFormData.get('slug'),
		description: rawFormData.get('description'),
		price: rawFormData.get('price'),
		imageUrl: rawFormData.get('imageUrl'),
		category: rawFormData.get('category'),
		stock: rawFormData.get('stock'),
	});

	if (!validatedFields.success) {
		return { error: 'Invalid fields', issues: validatedFields.error.issues };
	}

	try {
		await connectToDatabase();
		await Product.findByIdAndUpdate(id, validatedFields.data);
		revalidatePath('/admin/products');
		revalidatePath('/');
	} catch (error) {
		return { error: 'Failed to update product' };
	}
	redirect('/admin/products');
}

export async function deleteProduct(id: string) {
	try {
		await connectToDatabase();
		await Product.findByIdAndDelete(id);
		revalidatePath('/admin/products');
		revalidatePath('/');
	} catch (error) {
		console.error('Failed to delete product');
	}
}

export async function getProducts(query?: string) {
	await connectToDatabase();

	const filter: any = {};
	if (query) {
		filter.$or = [
			{ name: { $regex: query, $options: 'i' } },
			{ description: { $regex: query, $options: 'i' } },
			{ category: { $regex: query, $options: 'i' } },
		];
	}

	const products = await Product.find(filter).sort({ createdAt: -1 }).lean();
	// Convert _id and dates to string/number for serialization
	return products.map((p: any) => ({
		...p,
		_id: p._id.toString(),
		createdAt: p.createdAt?.toISOString(),
		updatedAt: p.updatedAt?.toISOString(),
	}));
}

export async function getProductBySlug(slug: string) {
	await connectToDatabase();
	const product = await Product.findOne({ slug }).lean();
	if (!product) return null;
	return {
		...product,
		_id: product._id.toString(),
		createdAt: product.createdAt?.toISOString(),
		updatedAt: product.updatedAt?.toISOString(),
	} as any;
}

export async function getProductById(id: string) {
	await connectToDatabase();
	const product = await Product.findById(id).lean();
	if (!product) return null;
	return {
		...product,
		_id: product._id.toString(),
		createdAt: product.createdAt?.toISOString(),
		updatedAt: product.updatedAt?.toISOString(),
	} as any;
}
