import { Request, Response, NextFunction } from 'express';
import { Vendor } from '../../models';
import { EditVendorInput, AuthPayload } from '../../types';
import { FindVendor, ValidatePassword, GenerateSignature } from '../../utility';

declare global {
	namespace Express {
		interface Request {
			user?: AuthPayload;
			get: any;
		}
	}
}

/*
    Vendor login
    POST request
*/
const VendorLogin = async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = req.body;

	//Find vendor in DB
	const ExistingVendor = await FindVendor('', email);
	if (!ExistingVendor) return res.json({ message: 'Invalid email address' });

	// validate password
	const validation = await ValidatePassword(password, ExistingVendor.password, ExistingVendor.salt);
	if (!validation) {
		return res.status(400).json({ Error: 'Invalid password' });
	}
	console.log(typeof ExistingVendor._id);
	// generate token
	const token = await GenerateSignature({ _id: ExistingVendor._id });
	res.cookie('token', token);
	return res.status(200).json({
		token,
		user: {
			_id: ExistingVendor._id,
			name: ExistingVendor.name,
			email: ExistingVendor.email,
		},
	});
};

/*
    Get Vendor profile
    POST request
*/

const GetVendorProfile = async (req: Request, res: Response, next: NextFunction) => {
	const user = req.user;
	if (user) {
		const ExistingUser = await FindVendor(user._id);
		return res.status(200).json({ ExistingUser });
	}
	res.status(400).json({ Error: 'User not found' });
};

/*
    Update Vendor profile
    PUT request
*/

const UpdateVendorProfile = async (req: Request, res: Response, next: NextFunction) => {
	const { name, address, phone, foodType } = req.body as EditVendorInput;
	const user = req.user;
	if (user) {
		const ExistingVendor = await FindVendor(user._id);
		if (ExistingVendor) {
			ExistingVendor.name = name;
			ExistingVendor.address = address;
			ExistingVendor.phone = phone;
			ExistingVendor.foodType = foodType;

			const SavedUser = await ExistingVendor.save();
			return res.status(200).json({ Success: 'User successfully saved', SavedUser });
		}
		res.status(400).json({ Error: 'Unable to save user' });
	}
	res.status(400).json({ Error: 'User not found' });
};

/*
    Update Vendor service
    PUT request
*/

const UpdateVendorService = async (req: Request, res: Response, next: NextFunction) => {
	const user = req.user;
	if (user) {
		const ExistingUser = await FindVendor(user._id);
		return res.status(200).json({ ExistingUser });
	}
	res.status(400).json({ Error: 'User not found' });
};

export { VendorLogin, GetVendorProfile, UpdateVendorProfile, UpdateVendorService };
