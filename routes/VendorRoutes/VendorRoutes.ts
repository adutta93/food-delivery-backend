const express = require('express');
import multer from 'multer';
const path = require('path');
const {
	VendorLogin,
	GetVendorProfile,
	UpdateVendorProfile,
	UpdateVendorCoverImage,
	UpdateVendorServiceStatus,
	AddFoodItems,
	GetAllFoodItems,
} = require('../../controller/');
const { Authenticate } = require('../../middleware');
const router = express.Router();

const imageStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'images');
	},
	filename: function (req, file, cb) {
		cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
	},
});

const images = multer({ storage: imageStorage }).array('images', 10);

router.post('/vendor/login', VendorLogin);
router.get('/vendor/profile', Authenticate, GetVendorProfile);
router.patch('/vendor/update-profile', Authenticate, UpdateVendorProfile);
router.patch('/vendor/coverimage', Authenticate, images, UpdateVendorCoverImage);
router.patch('/vendor/update-service-status', Authenticate, UpdateVendorServiceStatus);

router.post('/vendor/add-food', Authenticate, images, AddFoodItems);
router.get('/vendor/get-food', Authenticate, GetAllFoodItems);

export { router as VendorRoute };
