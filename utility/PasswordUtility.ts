const bcrypt = require('bcrypt');
const jwt = require('');

const GenereteSalt = async () => {
	return await bcrypt.genSalt();
};

const GeneretePassword = async (password: string, salt: string) => {
	return await bcrypt.hash(password, salt);
};

const ValidatePassword = async (enteredPassword: string, savedPassword: string, salt: string) => {
	return (await GeneretePassword(enteredPassword, salt)) === savedPassword;
};

export { GenereteSalt, GeneretePassword, ValidatePassword };
