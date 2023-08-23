const nodemailer = require('nodemailer');
require('dotenv').config();
const fs = require('fs');
const { convert } = require('html-to-text');
module.exports = class  Email{
  constructor(user, url){
    this.to = user.email;
    this.firstName = user.username;
    this.url = url;
    this.from = `Mateusz Zaniewski <${process.env.EMAIL_FROM}>`;
  }
  
  newTransport(){
    
    return nodemailer.createTransport({
      service: "SendGrid",
      auth:{
        user:process.env.SENDGRID_USERNAME,
        pass:process.env.SENDGRID_PASSWORD
      }
    })
  }
  async send(template, subject){
    try{

      const html = fs.readFileSync(`./views/${template}.html`, 'utf-8');
      //reactowy komponent
      const mailOptions = {
        from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html)
    }
    await this.newTransport().sendMail(mailOptions)
  }catch(err){console.log(err)}

  }
  async sendWelcome(){
    await this.send('WelcomeCard', 'Welcome in my application')
  }
  async sendPasswordReset() {
    
    await this.send(
      'ResetCard',
      'Your password reset token (valid for only 10 minutes)'
    );
  }
}
