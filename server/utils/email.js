const nodemailer = require('nodemailer');
const htmlToText = require('html-to-text');
// const EmailTemplate = require('../../client/src/components/')
require('dotenv').config();
module.exports = class  Email{
  constructor(){
    this.to = user.email;
    this.firstName = user.name;
    this.url = url;
    this.from = `Mateusz Zaniewski <${process.env.EMAIL_FROM}>`;

  }
  newTransport(){
      return nodemailer.newTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_NAME,
          pass: process.env.EMAIL_PASSWORD
        }
      });
  }
  async send(template, subject){
    //reactowy komponent
    // const html = <EmailTemplate name={this.to} text={this.subject}/>
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html)
    }
    this.newTransport();
    await this.newTransport().sendMail(mailOptions)

  }
  async sendWelcome(){
    await this.send('welcome', 'welcome')
  }

}
