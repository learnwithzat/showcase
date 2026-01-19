/** @format */

import { checkAuth } from '@/actions/auth';
import { getProductById } from '@/actions/products';
import { AdminProductEditForm } from '@/components/admin-product-edit-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { redirect, notFound } from 'next/navigation';

export default async function EditProductPage({
	params,
}: {
	params: { id: string };
}) {
	const isAuthenticated = await checkAuth();
	if (!isAuthenticated) redirect('/admin');

	const { id } = params;

	const product = await getProductById(id);

	if (!product) {
		notFound();
	}

	return (
		<div className='max-w-2xl mx-auto'>
			<Card>
				<CardHeader>
					<CardTitle>Edit Product</CardTitle>
				</CardHeader>
				<CardContent>
					<AdminProductEditForm product={product} />
				</CardContent>
			</Card>
		</div>
	);
}
