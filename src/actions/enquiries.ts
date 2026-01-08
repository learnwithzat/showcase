/** @format */
// c:\Latest\2026\Online\showcase\src\actions\enquiries.ts
'use server';

import { connectToDatabase } from '@/lib/db';
import Enquiry from '@/models/Enquiry';
import { z } from 'zod';
import { redirect } from 'next/navigation';

const enquirySchema = z.object({
	name: z.string().min(2),
	email: z.string().email(),
	message: z.string().min(10),
	productId: z.string().optional(),
	redirectTo: z.string().optional(),
});

export async function submitEnquiry(prevState: any, formData?: FormData) {
	const rawFormData = formData || (prevState as FormData);

	const validatedFields = enquirySchema.safeParse({
		name: rawFormData.get('name'),
		email: rawFormData.get('email'),
		message: rawFormData.get('message'),
		productId: rawFormData.get('productId') || undefined,
		redirectTo: rawFormData.get('redirectTo') || undefined,
	});

	if (!validatedFields.success) {
		return { error: 'Invalid fields', issues: validatedFields.error.issues };
	}

	try {
		await connectToDatabase();
		await Enquiry.create(validatedFields.data);

		// If a redirect URL is provided, redirect with success query
		if (validatedFields.data.redirectTo) {
			return redirect(
				`${validatedFields.data.redirectTo}${
					validatedFields.data.redirectTo.includes('?') ? '&' : '?'
				}success=1`
			);
		}

		return { success: true, message: 'Enquiry sent successfully!' };
	} catch (error) {
		console.error(error);
		return { error: 'Failed to send enquiry' };
	}
}

export async function getEnquiries() {
	await connectToDatabase();
	const enquiries = await Enquiry.find({}).sort({ createdAt: -1 }).lean();
	return enquiries.map((e: any) => ({
		...e,
		_id: e._id.toString(),
		createdAt: e.createdAt?.toISOString(),
	}));
}
