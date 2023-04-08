const QRCode = require('../models/qrCode');
const qrcode = require('qrcode');

const generateQRCode = async (req, res) => {
  try {
    const { data } = req.body;
    const image = await qrcode.toBuffer(data);
    const qrCode = new QRCode({
      data,
      image
    });
    await qrCode.save();
    res.status(201).send({ qrCode });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Server error' });
  }
};

const getQRCodeById = async (req, res) => {
  try {
    const qrCode = await QRCode.findById(req.params.id);
    if (!qrCode) {
      return res.status(404).send({ error: 'QR code not found' });
    }
    res.set('Content-Type', 'image/png');
    res.send(qrCode.image);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Server error' });
  }
};

module.exports = {
  generateQRCode,
  getQRCodeById
};
