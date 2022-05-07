const express = require('express');
const { VendorLogin } = require('../../controller/');

const router = express.Router();

router.post('/vendor/login', VendorLogin);

export { router as VendorRoute };
