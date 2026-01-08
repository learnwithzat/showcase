/** @format */

// c:\Latest\2026\Online\showcase\src\models\Product.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
	name: string;
	slug: string;
	description: string;
	price: number;
	imageUrl: string;
	category: string;
	stock: number;
	createdAt: Date;
	updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
	{
		name: { type: String, required: true },
		slug: { type: String, required: true, unique: true },
		description: { type: String, required: true },
		price: { type: Number, required: true },
		imageUrl: { type: String, required: true },
		category: { type: String, required: true },
		stock: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

const Product: Model<IProduct> =
	mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
