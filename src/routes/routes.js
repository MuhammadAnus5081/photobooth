const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { sendEmail } = require('../controller/emailController');

router.post('/sendemail', upload.single('file'), sendEmail);

module.exports = router;
