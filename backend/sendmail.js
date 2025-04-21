const sgMail = require('@sendgrid/mail');
require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'studyhub552@gmail.com',
  from: {
    email: 'mail@adarshaghimire.com.np',
    name: 'Adarsha Ghimire'
  },
  subject: 'Greetings',
  text: 'Hello'
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  });