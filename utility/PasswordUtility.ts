const bcrypt = require('bcrypt');

const GenereteSalt = async () => {
	return await bcrypt.genSalt();
};

const GeneretePassword = async (password: string, salt: string) => {
	return await bcrypt.hash(password, salt);
};

export { GenereteSalt, GeneretePassword };
