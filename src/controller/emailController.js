const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

const sendEmail = async (req, res) => {
  try {
    const { recipient } = req.body;
    const file = req.file;

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: 'ansari.anasai024@gmail.com',
        pass: 'gaombrfpsbsbjnjf'
      }
    });

    let attachment = null;

    // attach the file to the email if it exists
    const filePath = path.join(__dirname, 'resources', 'static', 'assets', 'uploads', req.file.filename);

try {
  const fileData = fs.readFileSync(filePath);
  console.log(fileData);
} catch (error) {
  console.log(error);
}

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: 'your_email@gmail.com',
      to: recipient,
      subject: 'Your Nordic Call Media is Ready!',
      text: `Dear User,

We hope this email finds you well. We are pleased to inform you that the media you have clicked or recorded on the Nordic Call app is now available for you to access.

If you encounter any issues while accessing your media, please do not hesitate to contact us. Our team of experts is always ready to assist you.

Thank you for choosing Nordic Call. We appreciate your continued support.

Best regards,
Team Nordic Call`,
      attachments: attachment ? [attachment] : undefined
    });

    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json(console.log(error));
  }
};
fs.chmodSync('/path/to/file', 0o644);
fs.chmodSync('/path/to/file', 'rw-r--r--'); // sets permissions to read and write for owner, read-only for group and others
module.exports = { sendEmail };
