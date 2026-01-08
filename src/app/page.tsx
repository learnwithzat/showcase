/** @format */
// src/app/page.tsx
import { getProducts } from '@/actions/products';
import ProductGrid from './ProductGrid';

export const revalidate = 60; // ISR cache: refresh every 60s

export type Product = {
	_id: string;
	name: string;
	description?: string;
	price: number;
	slug: string;
	imageUrl?: string;
};

interface HomeProps {
	searchParams: Promise<{ q?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
	// Resolve the searchParams promise
	const { q } = await searchParams;
	const query = q?.trim() || '';

	// Fetch products from the server
	const products: Product[] = await getProducts(query);

	return (
		<ProductGrid
			initialProducts={products}
			initialQuery={query}
		/>
	);
}
