const nodemailer = require('nodemailer');
require('dotenv').config();
const fs = require('fs');
// const welcomeTemplate = fs.readFileSync('./../views/WelcomeCard.html', 'utf-8');
// const resetTemplate = fs.readFileSync('./../views/WelcomeCard.html', 'utf-8');
const welcomeTemplate = '';
const resetTemplate = '';
module.exports = class  Email{
  constructor(){
    this.to = user.email;
    this.firstName = user.name;
    this.url = url;
    this.from = `Mateusz Zaniewski <${process.env.EMAIL_FROM}>`;
    this.welcomeTemplateCard =  welcomeTemplate.replace('{{ name }}', user.name);
    this.resetTemplateCard =  resetTemplate.replace('{{ url }}', this.url);
  }
  
  newTransport(){

    return nodemailer.createTransport({
      service: "SendGrid",
      auth:{
        user:process.env.SENDGRID_USERNAME,
        pass:process.env.SENDGRID_PASSWORD
      }
    })



      // return nodemailer.newTransport({
      //   host: process.env.EMAIL_HOST,
      //   port: process.env.EMAIL_PORT,
      //   auth: {
      //     user: process.env.EMAIL_NAME,
      //     pass: process.env.EMAIL_PASSWORD
      //   }
      // });
  }
  async send(template, subject){
    //reactowy komponent
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      template
    }
    this.newTransport();
    await this.newTransport().sendMail(mailOptions)

  }
  async sendWelcome(){
    await this.send(this.welcomeTemplate, 'Welcome in my application')
  }
  async sendPasswordReset() {
    
    await this.send(
      this.resetTemplate,
      'Your password reset token (valid for only 10 minutes)'
    );
  }
}
