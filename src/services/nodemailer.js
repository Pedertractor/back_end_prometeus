const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'treinamento.ptr@gmail.com',
    pass: 'htoa steq bpeg psrq',
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const enviaEmail = async (mensage) => {
  const emailOptions = {
    from: 'mailtrap@demomailtrap.com',
    to: ['joelisson.garbim@ptractor.com.br'],
    subject: 'Status Robo',
    text: mensage,
  };

  await transport.sendMail(emailOptions);
  console.log('email teste');
};

module.exports = {
  enviaEmail,
};
