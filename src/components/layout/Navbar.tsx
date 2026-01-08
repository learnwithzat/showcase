/** @format */

// c:\Latest\2026\Online\showcase\src\components\layout\Navbar.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import { ModeToggle } from '@/components/layout/mode-toggle';
import { SearchBar } from '@/components/layout/search-bar';
import { Suspense } from 'react';

export default function Navbar() {
	return (
		<header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
			<div className='container flex h-14 items-center justify-between px-4 md:px-8'>
				<div className='flex items-center gap-4'>
					<Link
						href='/'
						className='flex items-center gap-2 font-bold text-lg'>
						<ShoppingBag className='h-6 w-6' />
						<span>Showcase</span>
					</Link>
					<nav className='hidden md:flex items-center gap-6 text-sm font-medium'>
						<Link
							href='/'
							className='transition-colors hover:text-foreground/80 text-foreground/60'>
							Products
						</Link>
						<Link
							href='/enquiry'
							className='transition-colors hover:text-foreground/80 text-foreground/60'>
							Contact
						</Link>
					</nav>
				</div>
				<div className='flex items-center gap-2'>
					<Suspense fallback={null}>
						<SearchBar />
					</Suspense>
					<ModeToggle />
					<Link href='/admin'>
						<Button
							variant='ghost'
							size='sm'>
							Admin
						</Button>
					</Link>
				</div>
			</div>
		</header>
	);
}
