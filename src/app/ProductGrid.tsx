/** @format */
'use client';

import { useState, useEffect, useTransition } from 'react';
import { getProducts } from '@/actions/products';
import { Product } from './page';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import { MessageCircle, Phone, Mail } from 'lucide-react';

// Simple placeholder blur image
const BLUR_DATA_URL =
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg==';

interface ProductGridProps {
	initialProducts: Product[];
	initialQuery?: string;
}

const PAGE_SIZE = 8; // number of products per load

export default function ProductGrid({
	initialProducts,
	initialQuery = '',
}: ProductGridProps) {
	const [products, setProducts] = useState<Product[]>(initialProducts);
	const [query, setQuery] = useState(initialQuery);
	const [page, setPage] = useState(1);
	const [isPending, startTransition] = useTransition();
	const [loadingMore, setLoadingMore] = useState(false);

	// Search handler
	function handleSearch(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		startTransition(async () => {
			const form = e.currentTarget;
			const searchInput = (
				form.elements.namedItem('q') as HTMLInputElement
			).value.trim();
			setQuery(searchInput);
			setPage(1);
			setLoadingMore(true);
			const newProducts = await getProducts(searchInput);
			setProducts(newProducts.slice(0, PAGE_SIZE));
			setLoadingMore(false);
		});
	}

	// Load more handler for pagination
	async function handleLoadMore() {
		setLoadingMore(true);
		const nextPage = page + 1;
		const allProducts = await getProducts(query);
		setProducts(allProducts.slice(0, nextPage * PAGE_SIZE));
		setPage(nextPage);
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
					type='text'
					placeholder='Search products...'
					defaultValue={query}
					className='flex-1 border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500'
				/>
				<Button type='submit'>Search</Button>
			</form>

			{/* Grid */}
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
				{products.map((product) => (
					<Card
						key={product._id}
						className='flex flex-col overflow-hidden'>
						<div className='relative aspect-square w-full bg-zinc-100'>
							{product.imageUrl ? (
								<Image
									src={product.imageUrl}
									alt={product.name}
									fill
									sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
									className='object-cover transition-transform hover:scale-105'
									placeholder='blur'
									blurDataURL={BLUR_DATA_URL}
								/>
							) : (
								<div className='flex items-center justify-center h-full text-muted-foreground'>
									No Image
								</div>
							)}
						</div>
						<CardHeader>
							<CardTitle className='line-clamp-1'>{product.name}</CardTitle>
						</CardHeader>
						<CardContent className='flex-1'>
							<p className='text-sm text-muted-foreground line-clamp-2'>
								{product.description}
							</p>
							<p className='mt-2 font-bold text-lg'>
								{formatPrice(product.price)}
							</p>
						</CardContent>
						<CardFooter className='flex flex-col gap-2'>
							<Link
								href={`/products/${product.slug}`}
								className='w-full'>
								<Button className='w-full'>View Details</Button>
							</Link>
							<div className='flex gap-2'>
								<Link
									href={`/enquiry?product=${
										product._id
									}&name=${encodeURIComponent(product.name)}`}>
									<Button
										variant='outline'
										className='flex-1'>
										<MessageCircle className='mr-2 h-4 w-4' /> Enquiry
									</Button>
								</Link>
								<a
									href={`https://wa.me/?text=I'm interested in ${encodeURIComponent(
										product.name
									)}`}
									target='_blank'
									rel='noreferrer'
									className='flex-1'>
									<Button
										variant='outline'
										className='flex-1'>
										<Phone className='mr-2 h-4 w-4' /> WhatsApp
									</Button>
								</a>
								<a
									href={`mailto:?subject=Inquiry about ${encodeURIComponent(
										product.name
									)}&body=I am interested in this product.`}
									className='flex-1'>
									<Button
										variant='outline'
										className='flex-1'>
										<Mail className='mr-2 h-4 w-4' /> Email
									</Button>
								</a>
							</div>
						</CardFooter>
					</Card>
				))}
				{products.length === 0 && (
					<div className='col-span-full text-center py-20 text-muted-foreground'>
						No products found. Try another search.
					</div>
				)}
			</div>

			{/* Load more */}
			{products.length >= PAGE_SIZE && (
				<div className='flex justify-center mt-6'>
					<Button
						onClick={handleLoadMore}
						disabled={loadingMore}>
						{loadingMore ? 'Loading...' : 'Load More'}
					</Button>
				</div>
			)}
		</div>
	);
}
