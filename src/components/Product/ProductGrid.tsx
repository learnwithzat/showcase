/** @format */

'use client';

import { useState, useTransition } from 'react';
import { getProducts } from '@/actions/products';
import { Product } from '@/types/product';
import ProductSkeleton from './ProductSkeleton';
import { Button } from '@/components/ui/button';
import ProductCard from './ProductCard';

interface Props {
	initialProducts: Product[];
	initialQuery?: string;
}

const PAGE_SIZE = 8;

export default function ProductGrid({
	initialProducts,
	initialQuery = '',
}: Readonly<Props>) {
	const [products, setProducts] = useState(initialProducts);
	const [query, setQuery] = useState(initialQuery);
	const [page, setPage] = useState(1);
	const [isPending, startTransition] = useTransition();
	const [loadingMore, setLoadingMore] = useState(false);

	function handleSearch(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const q = (formData.get('q') as string)?.trim() || '';

		startTransition(async () => {
			setQuery(q);
			setPage(1);
			const all = await getProducts(q);
			setProducts(all.slice(0, PAGE_SIZE));
		});
	}

	async function handleLoadMore() {
		setLoadingMore(true);
		const next = page + 1;
		const all = await getProducts(query);
		setProducts(all.slice(0, next * PAGE_SIZE));
		setPage(next);
		setLoadingMore(false);
	}

	return (
		<div className='container mx-auto py-10 px-4'>
			{/* Search */}
			<form
				onSubmit={handleSearch}
				className='mb-6 flex gap-2'>
				<input
					name='q'
					defaultValue={query}
					placeholder='Search products...'
					className='flex-1 border rounded px-3 py-2'
				/>
				<Button disabled={isPending}>
					{isPending ? 'Searching…' : 'Search'}
				</Button>
			</form>

			{/* Grid */}
			{isPending ? (
				<ProductSkeleton count={PAGE_SIZE} />
			) : (
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
					{products.map((p) => (
						<ProductCard
							key={p._id}
							product={p}
						/>
					))}
				</div>
			)}

			{/* Load more */}
			{products.length >= PAGE_SIZE && !isPending && (
				<div className='flex justify-center mt-6'>
					<Button
						onClick={handleLoadMore}
						disabled={loadingMore}>
						{loadingMore ? 'Loading…' : 'Load More'}
					</Button>
				</div>
			)}
		</div>
	);
}
