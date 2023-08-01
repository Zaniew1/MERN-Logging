const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async options =>  {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_NAME,
          pass: process.env.EMAIL_PASSWORD
        }
      });
const mailOptions = {
    from: 'Mateusz Zaniewski <m.zaniewski1995@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.text,
    // html: 
}
 await transporter.sendMail(mailOptions)

}
module.exports = sendEmail;