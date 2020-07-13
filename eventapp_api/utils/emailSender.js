import nodemailer from 'nodemailer';
import env from '../src/config/env';

const sendEmail = async (options) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    auth: {
      user: env.SMTP_USER, // generated ethereal user
      pass: env.SMTP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  const message = {
    from: `${env.NAME_FROM} <${env.EMAIL_FROM}>`,
    to: options.email,
    subject: options.subject,
    amp: `<!doctype html>
    <html ⚡4email>
      <head>
        <meta charset="utf-8">
        <style amp4email-boilerplate>
        body{visibility:hidden}
        h1, p,a {
          padding: 15px;
        }
        
        a {
          text-decoration: none;
          border-radius: 4px;
          color: #FFF;
          background-color: #b366ff;
          outline: none;
        }
        </style>
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
      </head>
      <body>
        ${ options.emailTemplate }
      </body>
    </html>`
  };

  const info = await transporter.sendMail(message); 
}

export default sendEmail;
