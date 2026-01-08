/** @format */

// c:\Latest\2026\Online\showcase\src\app\admin/enquiries/page.tsx
import { checkAuth } from '@/actions/auth';
import { getEnquiries } from '@/actions/enquiries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { redirect } from 'next/navigation';
import { Badge } from '@/components/ui/badge';

type Enquiry = {
	_id: string;
	name: string;
	email: string;
	message: string;
	status: 'pending' | 'resolved' | string;
	productId?: string;
	createdAt: string | Date;
};

export default async function AdminEnquiriesPage() {
	const isAuthenticated = await checkAuth();
	if (!isAuthenticated) redirect('/admin');

	const enquiries: Enquiry[] = await getEnquiries();

	return (
		<div className='space-y-6'>
			<h1 className='text-3xl font-bold'>Enquiries</h1>

			<Card>
				<CardHeader>
					<CardTitle>Messages</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='space-y-4'>
						{enquiries.length > 0 ? (
							enquiries.map((enquiry) => (
								<div
									key={enquiry._id}
									className='p-4 border rounded-lg space-y-2'>
									<div className='flex justify-between items-start'>
										<div>
											<p className='font-semibold'>{enquiry.name}</p>
											<p className='text-sm text-muted-foreground'>
												{enquiry.email}
											</p>
										</div>
										<Badge
											variant={
												enquiry.status === 'pending' ? 'default' : 'secondary'
											}>
											{enquiry.status}
										</Badge>
									</div>

									<div className='bg-zinc-50 p-3 rounded text-sm'>
										{enquiry.message}
									</div>

									{enquiry.productId && (
										<p className='text-xs text-muted-foreground'>
											Regarding Product ID: {enquiry.productId}
										</p>
									)}

									<p className='text-xs text-muted-foreground text-right'>
										{new Date(enquiry.createdAt).toLocaleString(undefined, {
											year: 'numeric',
											month: 'short',
											day: 'numeric',
											hour: '2-digit',
											minute: '2-digit',
										})}
									</p>
								</div>
							))
						) : (
							<p className='text-muted-foreground text-center py-4'>
								No enquiries yet.
							</p>
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
