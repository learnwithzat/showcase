/** @format */

'use client';

import { useActionState } from 'react';
import { updateProduct } from '@/actions/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface AdminProductEditFormProps {
	product: {
		_id: string;
		name: string;
		slug: string;
		description: string;
		price: number;
		imageUrl: string;
		category: string;
		stock: number;
	};
}

export function AdminProductEditForm({ product }: AdminProductEditFormProps) {
	const [state, action, isPending] = useActionState(
		updateProduct.bind(null, product._id),
		null
	);

	return (
		<form
			action={action}
			className='space-y-4'>
			<Input
				name='name'
				placeholder='Product Name'
				defaultValue={product.name}
				required
			/>
			<Input
				name='slug'
				placeholder='Slug (e.g. my-product)'
				defaultValue={product.slug}
				required
			/>
			<Input
				name='price'
				type='number'
				step='0.01'
				placeholder='Price'
				defaultValue={product.price}
				required
			/>
			<Input
				name='category'
				placeholder='Category'
				defaultValue={product.category}
				required
			/>
			<Input
				name='stock'
				type='number'
				placeholder='Stock Quantity'
				defaultValue={product.stock}
				required
			/>
			<Input
				name='imageUrl'
				placeholder='Image URL'
				defaultValue={product.imageUrl}
				required
			/>
			<Textarea
				name='description'
				placeholder='Description'
				defaultValue={product.description}
				required
			/>
			{state?.error && <p className='text-red-500 text-sm'>{state.error}</p>}
			<Button
				type='submit'
				className='w-full'
				disabled={isPending}>
				{isPending ? 'Updating...' : 'Update Product'}
			</Button>
		</form>
	);
}
