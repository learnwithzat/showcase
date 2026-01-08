/** @format */

'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function ProductToast() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		if (searchParams.get('success') === '1') {
			toast.success('Enquiry Sent!', {
				description: 'We will get back to you shortly.',
			});
			const params = new URLSearchParams(searchParams.toString());
			params.delete('success');
			router.replace(`${pathname}?${params.toString()}`);
		}
	}, [searchParams, router, pathname]);

	return null;
}
