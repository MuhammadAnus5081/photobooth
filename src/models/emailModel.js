const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  recipient: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  attachment: {
    filename: {
      type: String
    },
    path: {
      type: String
    }
  }
});

const Email = mongoose.model('Email', emailSchema);

module.exports = Email;
