/** @format */
// src/app/page.tsx

import { getProducts } from '@/actions/products';
import ProductGrid from '@/components/Product/ProductGrid';
import { Product } from '@/types/product';

export const revalidate = 60;

type HomeProps = {
	searchParams: Promise<{
		q?: string | string[];
	}>;
};

export default async function Home({ searchParams }: HomeProps) {
	const resolvedParams = await searchParams;
	const rawQuery = resolvedParams?.q;
	const query =
		typeof rawQuery === 'string'
			? rawQuery.trim()
			: Array.isArray(rawQuery)
			? rawQuery[0]?.trim() ?? ''
			: '';

	const products: Product[] = await getProducts(query);

	return (
		<ProductGrid
			initialProducts={products}
			initialQuery={query}
		/>
	);
}
