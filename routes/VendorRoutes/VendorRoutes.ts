const express = require('express');
const { VendorLogin, GetVendorProfile, UpdateVendorProfile, UpdateVendorServiceStatus } = require('../../controller/');
const { Authenticate } = require('../../middleware');
const router = express.Router();

router.post('/vendor/login', VendorLogin);
router.get('/vendor/profile', Authenticate, GetVendorProfile);
router.patch('/vendor/update-profile', Authenticate, UpdateVendorProfile);
router.patch('/vendor/update-service-status', Authenticate, UpdateVendorServiceStatus);

export { router as VendorRoute };
