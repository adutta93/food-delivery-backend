const express = require('express');'express';
const { CreateVendor, GetVendors, GetVendorById } = require('../../controller/')
const router = express.Router()

router.post('/create-vendor', CreateVendor)
router.get('/get-vendor', GetVendors)
router.get('/get-vendor/:id', GetVendorById)

export { router as AdminRoute };