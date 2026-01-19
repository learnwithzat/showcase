/** @format */

// src/components/product/ProductSkeleton.tsx

import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductSkeleton({ count = 8 }: { count?: number }) {
	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
			{Array.from({ length: count }).map((_, i) => (
				<Card
					key={i}
					className='overflow-hidden'>
					<Skeleton className='aspect-square w-full' />
					<div className='p-4 space-y-2'>
						<Skeleton className='h-4 w-3/4' />
						<Skeleton className='h-3 w-full' />
						<Skeleton className='h-3 w-1/2' />
					</div>
				</Card>
			))}
		</div>
	);
}
