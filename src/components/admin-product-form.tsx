/** @format */

'use client';

import { useActionState } from 'react';
import { createProduct } from '@/actions/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function AdminProductForm() {
	const [state, action, isPending] = useActionState(createProduct, null);

	return (
		<form
			action={action}
			className='space-y-4'>
			<Input
				name='name'
				placeholder='Product Name'
				required
			/>
			<Input
				name='slug'
				placeholder='Slug (e.g. my-product)'
				required
			/>
			<Input
				name='price'
				type='number'
				step='0.01'
				placeholder='Price'
				required
			/>
			<Input
				name='category'
				placeholder='Category'
				required
			/>
			<Input
				name='stock'
				type='number'
				placeholder='Stock Quantity'
				required
			/>
			<Input
				name='imageUrl'
				placeholder='Image URL'
				required
			/>
			<Textarea
				name='description'
				placeholder='Description'
				required
			/>
			{state?.error && <p className='text-red-500 text-sm'>{state.error}</p>}
			<Button
				type='submit'
				className='w-full'
				disabled={isPending}>
				{isPending ? 'Adding...' : 'Add Product'}
			</Button>
		</form>
	);
}
