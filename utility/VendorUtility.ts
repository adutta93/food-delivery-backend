import { Vendor } from '../models/';

const FindVendor = async (id: String | undefined, email?: string) => {
	if (email) {
		return await Vendor.findOne({ email: email });
	} else {
		return await Vendor.findById(id);
	}
};

export { FindVendor };
