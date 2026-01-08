/** @format */
'use client';

import { useSearchParams } from 'next/navigation';
import { submitEnquiry } from '@/actions/enquiries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { useState, useTransition, useEffect, useRef, Suspense } from 'react';

function EnquiryForm() {
	const searchParams = useSearchParams();
	const productName = searchParams.get('name') || '';
	const productId = searchParams.get('product') || '';

	const [formState, setFormState] = useState<{
		success?: boolean;
		error?: string;
		fieldErrors?: Record<string, string>;
	}>({});
	const [isPending, startTransition] = useTransition();

	const formRef = useRef<HTMLDivElement>(null);
	const messageRef = useRef<HTMLTextAreaElement>(null);

	// Scroll to form and focus message if product info exists
	useEffect(() => {
		if (productName && formRef.current && messageRef.current) {
			formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
			messageRef.current.focus();
		}
	}, [productName]);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const form = e.currentTarget;
		const formData = new FormData(form);

		startTransition(async () => {
			try {
				const result = await submitEnquiry(null, formData);
				if (result?.error) {
					const fieldErrors: Record<string, string> = {};
					if (result.issues) {
						result.issues.forEach((issue: any) => {
							if (issue.path && issue.path[0]) {
								fieldErrors[issue.path[0]] = issue.message;
							}
						});
					}
					setFormState({
						error: typeof result.error === 'string' ? result.error : 'Error',
						fieldErrors,
					});
				} else {
					setFormState({ success: true });
					form.reset();
				}
			} catch (err: any) {
				setFormState({ error: err.message || 'Something went wrong' });
			}
		});
	}

	return (
		<div className='container max-w-lg mx-auto py-16 px-4'>
			<Card ref={formRef}>
				<CardHeader>
					<CardTitle>Send an Enquiry</CardTitle>
					<CardDescription>
						{productName
							? `Have questions about ${productName}?`
							: 'We would love to hear from you.'}
					</CardDescription>
				</CardHeader>
				<CardContent>
					{formState.success ? (
						<div className='text-green-600 text-center py-8 bg-green-50 rounded-md'>
							<p className='font-medium'>Message sent successfully!</p>
							<p className='text-sm mt-2'>We will get back to you shortly.</p>
						</div>
					) : (
						<form
							className='space-y-4'
							onSubmit={handleSubmit}>
							<input
								type='hidden'
								name='productId'
								value={productId}
							/>

							<div className='space-y-2'>
								<label
									htmlFor='name'
									className='text-sm font-medium'>
									Name
								</label>
								<Input
									id='name'
									name='name'
									placeholder='Your name'
									required
								/>
								{formState.fieldErrors?.name && (
									<p className='text-red-500 text-xs'>
										{formState.fieldErrors.name}
									</p>
								)}
							</div>

							<div className='space-y-2'>
								<label
									htmlFor='email'
									className='text-sm font-medium'>
									Email
								</label>
								<Input
									id='email'
									name='email'
									type='email'
									placeholder='john@example.com'
									required
								/>
								{formState.fieldErrors?.email && (
									<p className='text-red-500 text-xs'>
										{formState.fieldErrors.email}
									</p>
								)}
							</div>

							<div className='space-y-2'>
								<label
									htmlFor='message'
									className='text-sm font-medium'>
									Message
								</label>
								<Textarea
									ref={messageRef}
									id='message'
									name='message'
									placeholder='How can we help you?'
									rows={5}
									required
									defaultValue={
										productName
											? `I am interested in ${productName}. Is it available?`
											: ''
									}
								/>
								{formState.fieldErrors?.message && (
									<p className='text-red-500 text-xs'>
										{formState.fieldErrors.message}
									</p>
								)}
							</div>

							{formState.error && (
								<p className='text-red-500 text-sm'>{formState.error}</p>
							)}

							<Button
								type='submit'
								className='w-full'
								disabled={isPending}>
								{isPending ? 'Sending...' : 'Send Message'}
							</Button>
						</form>
					)}
				</CardContent>
			</Card>
		</div>
	);
}

export default function EnquiryPage() {
	return (
		<Suspense
			fallback={
				<div className='container max-w-lg mx-auto py-16 px-4'>Loading...</div>
			}>
			<EnquiryForm />
		</Suspense>
	);
}
