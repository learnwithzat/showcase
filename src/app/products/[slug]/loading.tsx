/** @format */

// src/app/products/[slug]/loading.tsx

import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
	return (
		<div className='container mx-auto py-10 px-4 grid md:grid-cols-2 gap-10'>
			<Skeleton className='aspect-square w-full' />
			<div className='space-y-4'>
				<Skeleton className='h-6 w-1/3' />
				<Skeleton className='h-10 w-3/4' />
				<Skeleton className='h-6 w-1/4' />
				<Skeleton className='h-24 w-full' />
				<Skeleton className='h-12 w-40' />
			</div>
		</div>
	);
}
