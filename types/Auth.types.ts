import { VendorPayload } from './Vendor.types';
import { CustomerPayload } from './Customer.types';

export type AuthPayload = VendorPayload | CustomerPayload;
