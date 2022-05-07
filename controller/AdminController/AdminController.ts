import { Request, Response, NextFunction } from 'express';
import { CreateVendorInput } from '../../types';
import { Vendor } from '../../models';
import { GeneretePassword, GenereteSalt, FindVendor } from '../../utility';

/* Create Vendor
	POST request
 */
const CreateVendor = async (req: Request, res: Response, next: NextFunction) => {
	const { name, ownerName, foodType, pincode, address, phone, email, password } = <CreateVendorInput>req.body;
	const isVendorExist = await FindVendor('', email);

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

/* Get all Vendors
	GET request
 */
const GetVendors = async (req: Request, res: Response, next: NextFunction) => {
	const vendors = await Vendor.find();
	if (!vendors) return res.json({ message: 'No vendor data found' });
	res.json({ count: vendors.length, vendors });
};

/* Get a singlr Vendors by ID
	GET request
 */
const GetVendorById = async (req: Request, res: Response, next: NextFunction) => {
	const ID = req.params.id;
	const vendor = await FindVendor(ID);

	if (vendor) return res.status(200).json(vendor);
	return res.json({ message: 'Vendor dose not exist' });
};

export { CreateVendor, GetVendors, GetVendorById };
