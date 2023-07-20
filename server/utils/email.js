const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async options =>  {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth:{
            user: process.env.EMAIL_NAME,
            pass: process.env.EMAIL_PASSWORD
        }
    })
const mailOptions = {
    from: 'Mateusz Zaniewski <m.zaniewski1995@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.text,
    // html: 
}
 await transporter.sendMail(mailOptions)

}