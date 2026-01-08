/** @format */

// c:\Latest\2026\Online\showcase\src\app\admin/page.tsx
import { checkAuth } from '@/actions/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminLoginForm } from '@/components/admin-login-form';

export default async function AdminPage() {
	const isAuthenticated = await checkAuth();

	if (isAuthenticated) {
		return (
			<div className='space-y-6'>
				<h1 className='text-3xl font-bold'>Dashboard</h1>
				<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
					<Card>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>
								Total Products
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='text-2xl font-bold'>Manage</div>
							<p className='text-xs text-muted-foreground'>
								View and edit your inventory
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>Enquiries</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='text-2xl font-bold'>Inbox</div>
							<p className='text-xs text-muted-foreground'>Customer messages</p>
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}

	return (
		<Card className='w-full max-w-sm mx-auto'>
			<CardHeader>
				<CardTitle className='text-2xl text-center'>Admin Login</CardTitle>
			</CardHeader>
			<CardContent>
				<AdminLoginForm />
			</CardContent>
		</Card>
	);
}
