import { Request, Response, NextFunction } from 'express';
import { AuthPayload } from '../types';
import { ValidateSignature } from '../utility';

// declare global {
// 	namespace Express {
// 		interface Request {
// 			user?: any;
// 			get: any;
// 		}
// 	}
// }

const Authenticate = async (req: Request, res: Response, next: NextFunction) => {
	const signature = await ValidateSignature(req);
	if (signature) {
		return next();
	} else {
		return res.json({ message: 'User Not authorised' });
	}
};

export { Authenticate };
