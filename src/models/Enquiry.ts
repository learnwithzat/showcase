/** @format */

// c:\Latest\2026\Online\showcase\src\models\Enquiry.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEnquiry extends Document {
	name: string;
	email: string;
	message: string;
	productId?: string; // Optional reference to a product
	status: 'pending' | 'read' | 'archived';
	createdAt: Date;
}

const EnquirySchema: Schema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		message: { type: String, required: true },
		productId: { type: String },
		status: {
			type: String,
			enum: ['pending', 'read', 'archived'],
			default: 'pending',
		},
	},
	{ timestamps: true }
);

const Enquiry: Model<IEnquiry> =
	mongoose.models.Enquiry || mongoose.model<IEnquiry>('Enquiry', EnquirySchema);

export default Enquiry;
