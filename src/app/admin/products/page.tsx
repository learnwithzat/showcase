/** @format */

// c:\Latest\2026\Online\showcase\src\app\admin/products/page.tsx
import { checkAuth } from '@/actions/auth';
import { deleteProduct, getProducts } from '@/actions/products';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { redirect } from 'next/navigation';
import { Pencil, Trash2 } from 'lucide-react';
import { AdminProductForm } from '@/components/admin-product-form';
import Link from 'next/link';

export default async function AdminProductsPage() {
	const isAuthenticated = await checkAuth();
	if (!isAuthenticated) redirect('/admin');

	const products = await getProducts();

	return (
		<div className='space-y-8'>
			<div className='flex justify-between items-center'>
				<h1 className='text-3xl font-bold'>Products</h1>
			</div>

			<div className='grid lg:grid-cols-3 gap-8'>
				{/* Create Product Form */}
				<Card className='lg:col-span-1 h-fit'>
					<CardHeader>
						<CardTitle>Add New Product</CardTitle>
					</CardHeader>
					<CardContent>
						<AdminProductForm />
					</CardContent>
				</Card>

				{/* Product List */}
				<Card className='lg:col-span-2'>
					<CardHeader>
						<CardTitle>Inventory</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='space-y-4'>
							{products.map((product: any) => (
								<div
									key={product._id}
									className='flex items-center justify-between p-4 border rounded-lg'>
									<div className='flex items-center gap-4'>
										<div className='h-12 w-12 bg-zinc-100 rounded overflow-hidden relative'>
											{/* eslint-disable-next-line @next/next/no-img-element */}
											<img
												src={product.imageUrl}
												alt={product.name}
												className='object-cover w-full h-full'
											/>
										</div>
										<div>
											<p className='font-medium'>{product.name}</p>
											<p className='text-sm text-muted-foreground'>
												${product.price} • {product.stock} in stock
											</p>
										</div>
									</div>
									<div className='flex items-center gap-2'>
										<Link href={`/admin/products/${product._id}`}>
											<Button
												variant='outline'
												size='icon'>
												<Pencil className='h-4 w-4' />
											</Button>
										</Link>
										<form action={deleteProduct.bind(null, product._id)}>
											<Button
												variant='destructive'
												size='icon'>
												<Trash2 className='h-4 w-4' />
											</Button>
										</form>
									</div>
								</div>
							))}
							{products.length === 0 && (
								<p className='text-muted-foreground text-center py-4'>
									No products yet.
								</p>
							)}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
