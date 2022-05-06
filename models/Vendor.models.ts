import mongoose, { Schema, Document, Model } from 'mongoose';

interface VendorDoc extends Document {
	name: string;
	ownerName: string;
	foodType: [string];
	pincode: string;
	address: string;
	phone: string;
	email: string;
	password: string;
	salt: string;
	serviceAvailable: string;
	coverImages: [string];
	rating: number;
	foods: any;
	lat: number;
	lng: number;
}

const VendorSchema = new Schema(
	{
		name: { type: String, required: true, maxLength: 30 },
		ownerName: { type: String, required: true, maxLength: 30 },
		foodType: { type: [String] },
		pincode: { type: String, required: true, maxLength: 6 },
		address: { type: String, required: true },
		phone: { type: String, required: true, maxLength: 10 },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		salt: { type: String },
		serviceAvailable: { type: String, required: true },
		coverImages: { type: [String] },
		rating: { type: Number },
		// foods: [
		// 	{
		// 		type: mongoose.SchemaType.ObjectId,
		// 		ref: 'food',
		// 	},
		// ],
		lat: { type: Number },
		lng: { type: Number },
	},
	{
		toJSON: {
			transform(doc, ret) {
				delete ret.password;
				delete ret.salt;
				delete ret.__v;
				delete ret.createdAt;
				delete ret.updatedAt;
			},
		},
		timestamps: true,
	}
);

const Vendor = mongoose.model<VendorDoc>('Vendor', VendorSchema);

export { Vendor };
