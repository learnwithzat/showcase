/** @format */

// src/types/product.ts
export type Product = {
	_id: string;
	name: string;
	description?: string;
	price: number;
	slug: string;
	imageUrl?: string;
	stock?: number;
	category?: string;
};
