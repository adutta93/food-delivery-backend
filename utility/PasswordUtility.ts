const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AuthPayload } = require('../types');
const { APP_SECRET } = require('../config');
const { IRequest } = require('../types');

const GenereteSalt = async () => {
	return await bcrypt.genSalt();
};

const GeneretePassword = async (password: string, salt: string) => {
	return await bcrypt.hash(password, salt);
};

const ValidatePassword = async (enteredPassword: string, savedPassword: string, salt: string) => {
	return (await GeneretePassword(enteredPassword, salt)) === savedPassword;
};

const GenerateSignature = async (payload: typeof AuthPayload) => {
	return await jwt.sign(payload, APP_SECRET, { expiresIn: '2d' });
};

export const ValidateSignature = async (req: typeof IRequest) => {
	const token = req.get('Authorization').split(' ')[1];
	if (token) {
		const payload = (await jwt.verify(token, APP_SECRET)) as typeof AuthPayload;
		req.user = payload;
		return true;
	}
	return false;
};
export { GenereteSalt, GeneretePassword, ValidatePassword, GenerateSignature };
