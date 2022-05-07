const express = require('express');
const { VendorLogin, GetVendorProfile } = require('../../controller/');
const { Authenticate } = require('../../middleware');
const router = express.Router();

router.post('/vendor/login', VendorLogin);
router.get('/vendor/profile', Authenticate, GetVendorProfile);

export { router as VendorRoute };
