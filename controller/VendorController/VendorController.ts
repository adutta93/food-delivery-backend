import { Request, Response, NextFunction } from 'express';
import { Vendor } from '../../models';
import { FindVendor, ValidatePassword, GenerateSignature } from '../../utility';
const { APP_SECRET } = require('../../config');
const jwt = require('jsonwebtoken');
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

export { VendorLogin };
