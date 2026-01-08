/** @format */
// src/actions/auth.ts
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(prevState: any, formData: FormData) {
	const email = formData.get('email') as string;
	const password = formData.get('password') as string;

	const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
	const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

	if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
		const cookieStore = await cookies();
		cookieStore.set('admin_session', 'true', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24, // 1 day
			path: '/',
		});
		redirect('/admin');
	} else {
		return { error: 'Invalid credentials' };
	}
}

export async function logout() {
	const cookieStore = await cookies();
	cookieStore.delete('admin_session');
	redirect('/admin');
}

export async function checkAuth() {
	const cookieStore = await cookies();
	return cookieStore.has('admin_session');
}
