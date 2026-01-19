/** @format */
// src/app/products/[slug]/page.tsx

import { getProductBySlug } from '@/actions/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { formatPrice } from '@/lib/utils';
import { ArrowLeft, MessageCircle } from 'lucide-react';

import ProductToast from './ProductToast';

interface PageProps {
	params: Promise<{
		slug: string;
	}>;
}

export default async function ProductPage({ params }: Readonly<PageProps>) {
	const { slug } = await params;
	const product = await getProductBySlug(slug);

	if (!product) {
		notFound();
	}

	const isInStock = product.stock > 0;

	return (
		<div className='container mx-auto py-10 px-4'>
			<ProductToast />

			{/* Back link */}
			<Link
				href='/'
				className='inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6'>
				<ArrowLeft className='mr-2 h-4 w-4' />
				Back to Products
			</Link>

			<div className='grid md:grid-cols-2 gap-10'>
				{/* Image */}
				<div className='relative aspect-square bg-zinc-100 rounded-lg overflow-hidden border'>
					<Image
						src={product.imageUrl || '/placeholder.png'}
						alt={product.name}
						fill
						className='object-cover'
						priority
						sizes='(max-width: 768px) 100vw, 50vw'
					/>
				</div>

				{/* Details */}
				<div className='flex flex-col gap-6'>
					<div>
						<Badge
							variant='secondary'
							className='mb-2'>
							{product.category}
						</Badge>

						<h1 className='text-4xl font-bold tracking-tight'>
							{product.name}
						</h1>

						<p className='text-2xl font-semibold mt-2'>
							{formatPrice(product.price)}
						</p>
					</div>

					<div className='prose dark:prose-invert'>
						<p>{product.description}</p>
					</div>

					<div className='flex flex-col gap-2 mt-auto'>
						<div className='text-sm text-muted-foreground mb-4'>
							Stock: {isInStock ? `${product.stock} available` : 'Out of stock'}
						</div>

						<Link
							href={`/enquiry?product=${product._id}&name=${encodeURIComponent(
								product.name
							)}`}>
							<Button
								size='lg'
								className='w-full md:w-auto'>
								<MessageCircle className='mr-2 h-4 w-4' />
								Enquire about this product
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
