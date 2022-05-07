import { Request, Response, NextFunction } from 'express';
import { ValidateSignature } from '../utility';

const Authenticate = async (req: Request, res: Response, next: NextFunction) => {
	const signature = await ValidateSignature(req);
	if (signature) {
		return next();
	} else {
		return res.json({ message: 'User Not authorised' });
	}
};

export { Authenticate };
