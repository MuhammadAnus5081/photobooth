const express = require('express');
const Pin = require('../models/pin');

const router = express.Router();

router.get('/pins', (req, res) => {
  const pin = Pin.generate();
  res.send({ pin });
});

module.exports = router;
