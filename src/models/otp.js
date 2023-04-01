const mongoose = require('mongoose');

const otpSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true },
    otp: { type: String, required: true }
});

module.exports = mongoose.model('Otp', otpSchema);
