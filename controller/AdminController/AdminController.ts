import { Request, Response, NextFunction } from 'express';
import { CreateVendorInput } from '../../types';
import { Vendor } from '../../models';
import { GeneretePassword, GenereteSalt } from '../../utility';
const CreateVendor = async (req: Request, res: Response, next: NextFunction) => {
	const { name, ownerName, foodType, pincode, address, phone, email, password } = <CreateVendorInput>req.body;
	const isVendorExist = await Vendor.findOne({ email });

	if (isVendorExist) {
		return res.status(409).json({ message: 'A Vendor with this email already exists' });
	}

	// generate salts
	const salt = await GenereteSalt();
	const _password = await GeneretePassword(password, salt);
	const _createVendor = await Vendor.create({
		name: name,
		ownerName: ownerName,
		foodType: foodType,
		pincode: pincode,
		address: address,
		phone: phone,
		email: email,
		password: _password,
		rating: 0,
		salt: salt,
		serviceAvailable: false,
		coverImages: [],
	});
	return res.json({
		_createVendor,
	});
};

const GetVendors = (req: Request, res: Response, next: NextFunction) => {
	res.json({ message: 'Hello from admin login' });
};

const GetVendorById = (req: Request, res: Response, next: NextFunction) => {
	res.json({ message: 'Hello from admin login' });
};

export { CreateVendor, GetVendors, GetVendorById };
