/** @format */

'use client';

import { useActionState } from 'react';
import { login } from '@/actions/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function AdminLoginForm() {
	const [state, action, isPending] = useActionState(login, undefined);

	return (
		<form
			action={action}
			className='space-y-4'>
			<div className='space-y-2'>
				<label className='text-sm font-medium'>Email</label>
				<Input
					name='email'
					type='email'
					required
					placeholder='admin@example.com'
				/>
			</div>
			<div className='space-y-2'>
				<label className='text-sm font-medium'>Password</label>
				<Input
					name='password'
					type='password'
					required
					placeholder='••••••••'
				/>
			</div>
			{state?.error && <p className='text-sm text-red-500'>{state.error}</p>}
			<Button
				type='submit'
				className='w-full'
				disabled={isPending}>
				{isPending ? 'Logging in...' : 'Login'}
			</Button>
		</form>
	);
}
