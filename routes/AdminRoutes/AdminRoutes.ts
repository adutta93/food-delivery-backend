const express = require('express');
const { CreateVendor, GetVendors, GetVendorById } = require('../../controller/');
const router = express.Router();

router.post('/admin/create-vendor', CreateVendor);
router.get('/admin/get-vendors', GetVendors);
router.get('/admin/get-vendor/:id', GetVendorById);

export { router as AdminRoute };
