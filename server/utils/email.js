const nodemailer = require('nodemailer');
require('dotenv').config();
module.exports = class  Email{
  constructor(user, url){
    this.username = user.username;
    this.to = user.email;
    this.firstName = user.username;
    this.url = url;
    this.from = process.env.EMAIL_FROM;
  }
  
  newTransport(){
    return nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: process.env.SENDGRID_PORT,
      secure: false,
      auth:{
        user:process.env.SENDGRID_USERNAME,
        pass:process.env.SENDGRID_PASSWORD
      }
    })
  }
  async send(template, subject){
    try{
      const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html: template,
      text: convert(template)
    }
    await this.newTransport().sendMail(mailOptions)
  }catch(err){console.log(err)}

  }
  async sendWelcome(){
    const template = `
      <div style="background: rgb(3,169,244); padding: 30px; color: #fff; background: linear-gradient(90deg, rgba(3,169,244,1) 0%, rgba(136,0,13,1) 60%); ">
      <p style="font-size: 14px;"> Witaj ${this.username ? this.username : ''} !</p>
      </br>
      <p style="margin: 15px auto; ">Bardzo się cieszę że założyłeś konto w mojej aplikacji, aby potwierdzić konto naciśnij przycisk poniżej </p>
      </br>
      <a style="width: 100px; text-decoration: none; padding: 10px; height: 30px; border-radius: 5px; border: 1px solid #fff; font-size: 10px; background-color: #1662d9; color: #fff;cursor: pointer;" href="${this.url}">Przejdź do aplikacji</a>
      </div>
    `;
    await this.send(template, `Witaj w mojej aplikacji ${this.username ? this.username : ''}!`)
  }
  async sendPasswordReset() {
    const template = `
      <div style="background: rgb(3,169,244); color: #fff; padding: 30px; background: linear-gradient(90deg, rgba(3,169,244,1) 0%, rgba(136,0,13,1) 60%); ">
      <p style="font-size: 14px; "> Witaj ${this.username ? this.username : ''} !</p>
      </br>
      <p style="margin: 15px auto; color: #fff;">Aby zresetować hasło naciśnij przycisk poniżej</p>
      </br>
      <a style="width: 100px; text-decoration: none; padding: 10px; height: 30px; border-radius: 5px; border: 1px solid #fff; font-size: 10px; background-color: #1662d9; color: #fff;cursor: pointer;" href="${this.url}">Zresetuj hasło</a>
      </div>
    `;
    await this.send(
      template,
      'Twój resetujący token (ważny tylko 10 minut)'
    );
  }
}
