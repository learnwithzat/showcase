/** @format */

// c:\Latest\2026\Online\showcase\src\app\admin/layout.tsx
import { checkAuth } from '@/actions/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Package, MessageSquare, LogOut } from 'lucide-react';
import { logout } from '@/actions/auth';

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const isAuthenticated = await checkAuth();

	// If not authenticated, we let the page.tsx handle the login form
	// But if we are in sub-routes like /admin/products, we must redirect
	// We can't easily check path here in layout without headers, so we rely on page level checks or middleware.
	// For simplicity in this structure, we will render the sidebar only if authenticated.

	if (!isAuthenticated) {
		return (
			<div className='min-h-screen bg-zinc-50 flex items-center justify-center'>
				{children}
			</div>
		);
	}

	return (
		<div className='flex min-h-screen bg-zinc-50'>
			<aside className='w-64 bg-white border-r hidden md:flex flex-col'>
				<div className='p-6 border-b'>
					<h2 className='font-bold text-xl'>Admin Panel</h2>
				</div>
				<nav className='flex-1 p-4 space-y-2'>
					<Link href='/admin'>
						<Button
							variant='ghost'
							className='w-full justify-start'>
							<LayoutDashboard className='mr-2 h-4 w-4' /> Dashboard
						</Button>
					</Link>
					<Link href='/admin/products'>
						<Button
							variant='ghost'
							className='w-full justify-start'>
							<Package className='mr-2 h-4 w-4' /> Products
						</Button>
					</Link>
					<Link href='/admin/enquiries'>
						<Button
							variant='ghost'
							className='w-full justify-start'>
							<MessageSquare className='mr-2 h-4 w-4' /> Enquiries
						</Button>
					</Link>
				</nav>
				<div className='p-4 border-t'>
					<form action={logout}>
						<Button
							variant='outline'
							className='w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50'>
							<LogOut className='mr-2 h-4 w-4' /> Logout
						</Button>
					</form>
				</div>
			</aside>
			<main className='flex-1 p-8 overflow-auto'>{children}</main>
		</div>
	);
}
