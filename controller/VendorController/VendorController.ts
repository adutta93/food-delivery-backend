import { Request, Response, NextFunction } from 'express';
import { Vendor } from '../../models';
import { FindVendor, ValidatePassword } from '../../utility';

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

	// return vendor details on successful validation
	return res.status(200).json(ExistingVendor);
};

export { VendorLogin };
