/** @format */

'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function SearchBar() {
	const searchParams = useSearchParams();
	const { replace } = useRouter();
	const [term, setTerm] = useState(searchParams.get('q') || '');

	useEffect(() => {
		const currentQ = searchParams.get('q') || '';
		if (term === currentQ) return;

		const handler = setTimeout(() => {
			const params = new URLSearchParams(searchParams);
			if (term) {
				params.set('q', term);
			} else {
				params.delete('q');
			}
			replace(`/?${params.toString()}`);
		}, 300);

		return () => clearTimeout(handler);
	}, [term, searchParams, replace]);

	return (
		<div className='relative hidden md:block'>
			<Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
			<Input
				type='search'
				placeholder='Search products...'
				className='w-[200px] pl-8 lg:w-[300px]'
				value={term}
				onChange={(e) => setTerm(e.target.value)}
			/>
		</div>
	);
}
