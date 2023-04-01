const Pin = require('../models/pin');

exports.generatePin = (req, res) => {
  const pin = Pin.generate();
  res.send();
};
