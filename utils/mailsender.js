var nodemailer = require('nodemailer');

nodemailer.createTransport({
    host: "smtp.example.com",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: "mark@",
      pass: "password",
    },
  });


var mailOptions = {
  from: 'youremail@gmail.com',
  to: 'promaxcoq@gmail.com',
  subject: 'Data Captured',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});