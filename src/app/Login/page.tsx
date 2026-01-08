/** @format */

'use client';

import { useState } from 'react';
import { login } from '@/actions/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		const formData = new FormData();
		formData.append('email', email);
		formData.append('password', password);

		const result = await login(null, formData);
		if ((result as any)?.error) {
			setError((result as any).error);
		}
	}

	return (
		<div className='container max-w-md mx-auto py-16'>
			<h1 className='text-3xl font-bold mb-6'>Login</h1>
			<form
				className='space-y-4'
				onSubmit={handleSubmit}>
				<div>
					<label className='text-sm font-medium'>Email</label>
					<Input
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div>
					<label className='text-sm font-medium'>Password</label>
					<Input
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				{error && <p className='text-red-500 text-sm'>{error}</p>}
				<Button
					type='submit'
					className='w-full'>
					Login
				</Button>
			</form>
		</div>
	);
}
