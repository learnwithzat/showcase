/** @format */
// src/components/product/ProductCard.tsx

'use client';

import { Product } from '@/types/product';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { ArrowRight, Heart, Eye, ShoppingCart, Package } from 'lucide-react';

export default function ProductCard({ product }: { product: Product }) {
	const inStock = product.stock === undefined || product.stock > 0;

	return (
		<Card
			className='
        group relative flex flex-col overflow-hidden
        rounded-2xl border bg-background
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-2xl
      '>
			{/* Image */}
			<div className='relative aspect-square bg-muted overflow-hidden'>
				{product.imageUrl ? (
					<Image
						src={product.imageUrl}
						alt={product.name}
						fill
						sizes='(max-width: 768px) 100vw, 25vw'
						className='
              object-cover
              transition-transform duration-500
              group-hover:scale-110
            '
					/>
				) : (
					<div className='flex h-full items-center justify-center text-muted-foreground'>
						No Image
					</div>
				)}

				{/* Price Badge */}
				<div className='absolute top-3 left-3 rounded-full bg-background/90 backdrop-blur px-3 py-1 text-sm font-semibold shadow'>
					{formatPrice(product.price)}
				</div>

				{/* Category Badge */}
				{product.category && (
					<div className='absolute top-3 right-3 rounded-full bg-primary/90 text-primary-foreground px-3 py-1 text-xs font-medium shadow'>
						{product.category}
					</div>
				)}

				{/* Hover Actions */}
				<div
					className='
            absolute inset-0 flex items-center justify-center gap-2
            bg-black/30 opacity-0
            transition-opacity duration-300
            group-hover:opacity-100
          '>
					<Button
						size='icon'
						variant='secondary'
						aria-label='Quick view'>
						<Eye className='h-4 w-4' />
					</Button>

					<Button
						size='icon'
						variant='secondary'
						aria-label='Add to wishlist'>
						<Heart className='h-4 w-4' />
					</Button>
				</div>
			</div>

			{/* Header */}
			<CardHeader className='pb-2'>
				<h3 className='text-base font-semibold leading-tight line-clamp-1'>
					{product.name}
				</h3>
			</CardHeader>

			{/* Content */}
			<CardContent className='flex-1 pt-0 space-y-2'>
				<p className='text-sm text-muted-foreground line-clamp-2'>
					{product.description}
				</p>

				{/* Stock */}
				<div className='flex items-center gap-2 text-xs'>
					<Package className='h-4 w-4 text-muted-foreground' />
					<span className={inStock ? 'text-green-600' : 'text-destructive'}>
						{inStock ? 'In stock' : 'Out of stock'}
					</span>
				</div>
			</CardContent>

			{/* Footer */}
			<CardFooter className='pt-0 flex flex-col gap-2'>
				{/* Add to cart */}
				<Button
					className='w-full gap-2'
					disabled={!inStock}>
					<ShoppingCart className='h-4 w-4' />
					Add to Cart
				</Button>

				{/* View details */}
				<Button
					asChild
					variant='outline'
					className='
            w-full gap-2
            transition-colors
            group-hover:bg-primary group-hover:text-primary-foreground
          '>
					<Link href={`/products/${product.slug}`}>
						View Details
						<ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
					</Link>
				</Button>
			</CardFooter>
		</Card>
	);
}
