/** @format */

// c:\Latest\2026\Online\showcase\src\app\products/[slug]/page.tsx
import { getProductBySlug } from '@/actions/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { formatPrice } from '@/lib/utils';
import { ArrowLeft, MessageCircle } from 'lucide-react';

import ProductToast from './ProductToast'; // adjust path if needed

export default async function ProductPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const product = await getProductBySlug(slug);

	if (!product) notFound();

	return (
		<div className='container mx-auto py-10 px-4'>
			<ProductToast /> {/* Toast will show on success */}
			<Link
				href='/'
				className='inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6'>
				<ArrowLeft className='mr-2 h-4 w-4' /> Back to Products
			</Link>
			{/* Product details ... */}
			<div className='grid md:grid-cols-2 gap-10'>
				<div className='relative aspect-square bg-zinc-100 rounded-lg overflow-hidden border'>
					<Image
						src={product.imageUrl}
						alt={product.name}
						fill
						className='object-cover'
						priority
					/>
				</div>

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
						<div className='flex items-center gap-2 text-sm text-muted-foreground mb-4'>
							<span>
								Stock:{' '}
								{product.stock > 0
									? `${product.stock} available`
									: 'Out of stock'}
							</span>
						</div>

						<Link
							href={`/enquiry?product=${product._id}&name=${encodeURIComponent(
								product.name
							)}`}>
							<Button
								size='lg'
								className='w-full md:w-auto'>
								<MessageCircle className='mr-2 h-4 w-4' /> Enquire about this
								product
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
