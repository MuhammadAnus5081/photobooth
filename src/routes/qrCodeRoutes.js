const express = require('express');
const router = express.Router();
const qrCodeController = require('../controller/qrCodeController');

router.post('/generate', qrCodeController.generateQRCode);
router.get('/:id', qrCodeController.getQRCodeById);

module.exports = router;
