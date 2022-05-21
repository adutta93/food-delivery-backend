import { Request, Response, NextFunction } from 'express';
import { Vendor, Food } from '../../models';
import { EditVendorInput, AuthPayload, CreateFoodInput } from '../../types';
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

export const UpdateVendorCoverImage = async (req: Request, res: Response, next: NextFunction) => {
	const user = req.user;

	if (user) {
		const ExistingVendor = await FindVendor(user._id);

		if (ExistingVendor) {
			const files = req.files as [Express.Multer.File];
			const images = files.map((file: Express.Multer.File) => file.filename);
			ExistingVendor.coverImages.push(...images);
			const SaveResult = await ExistingVendor.save();
			return res.json(SaveResult);
		}
	}
	return res.json({ message: 'Unable to Update vendor profile ' });
};
/*
    Update Vendor service
    PUT request
*/

const UpdateVendorServiceStatus = async (req: Request, res: Response, next: NextFunction) => {
	const user = req.user;
	if (user) {
		const ExistingVendor = await FindVendor(user._id);
		if (ExistingVendor) {
			ExistingVendor.serviceAvailable = !ExistingVendor.serviceAvailable;
			const SavedUser = await ExistingVendor.save();
			return res.status(200).json({ Success: 'Service status successfully changed', SavedUser });
		}
		res.status(400).json({ Error: 'Unable to change service status' });
	}
	res.status(400).json({ Error: 'User not found' });
};

/*
    Add food items
    POST request
*/
const AddFoodItems = async (req: Request, res: Response, next: NextFunction) => {
	const user = req.user;
	if (user) {
		const { name, description, category, foodType, readyTime, price } = <CreateFoodInput>req.body;
		const ExistingVendor = await FindVendor(user._id);
		if (ExistingVendor) {
			const files = req.files as [Express.Multer.File];
			const images = files.map((file: Express.Multer.File) => file.filename);

			const CreatedFood = await Food.create({
				vendorId: ExistingVendor._id,
				name,
				description,
				category,
				foodType,
				readyTime,
				images: images,
				price,
			});
			ExistingVendor.foods.push(CreatedFood);
			const FinaleResult = await ExistingVendor.save();
			return res.status(200).json({ Success: 'FoodItem successfully created', CreatedFood, FinaleResult });
		}
		res.status(400).json({ Error: 'Unable to create FoodItem' });
	}
	res.status(400).json({ Error: 'User not found' });
};

const GetAllFoodItems = async (req: Request, res: Response, next: NextFunction) => {
	const AllFood = await Food.find();
	if (!AllFood) return res.json({ message: 'No food data found' });
	res.json({ count: AllFood.length, AllFood });
};

export { VendorLogin, GetVendorProfile, UpdateVendorProfile, UpdateVendorServiceStatus, AddFoodItems, GetAllFoodItems };
