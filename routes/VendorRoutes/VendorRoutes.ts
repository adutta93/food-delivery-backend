const express = require('express');;
const { VendorLogin, VendorRegister } = require('../../controller/')

const router = express.Router()

router.get('/vendor-log', VendorLogin)
router.get('/vendor-reg', VendorRegister)

export { router as VendorRoute };