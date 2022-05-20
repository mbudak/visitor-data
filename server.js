require('dotenv').config();
const DeviceDetector = require('node-device-detector');
const ClientHints = require('node-device-detector/client-hints')

// init app
const deviceDetector = new DeviceDetector;
const clientHints = new ClientHints;

const hasBotResult = (result) => {
    return result && result.name;
  }

  // create middleware
  const middlewareDetect = (req, res, next) => {
    const useragent = req.headers['user-agent']; 
    const clientHintsData = clientHints.parse(res.headers);
  
    req.useragent = useragent;
    req.device = deviceDetector.detect(useragent, clientHintsData);
    req.bot = deviceDetector.parseBot(useragent);
    next();
  };
  



var nodemailer = require('nodemailer');
var requestIp = require('request-ip');


const express = require('express');
const port = 8080;
var host = "localhost";
const app = express();



  // attach middleware
  app.use(middlewareDetect);


/* Mail */
var smtpTransport = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
        ciphers:'SSLv3'
    }
  });

  

app.get("/", (req, res, next) => {
    let useragent = req.useragent;
    let detectResult = req.device;
    let botResult = req.bot;
    var result = JSON.stringify({useragent, detectResult, botResult, isBot: hasBotResult(botResult)});


    var clientIp = requestIp.getClientIp(req);

    var smptOptions = {
        from: process.env.SMTP_FROM, // sender address
        to: process.env.SMTP_TO, // list of receivers
        subject: "Data captured", // Subject line
        text: "IP is... [ " + clientIp  + " ] : " + JSON.stringify(result)
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

      /*
      res.writeHead(301, {
        Location: `https://facebook.com`
      }).end();
      */

    res.status(200).send("received");
})

var server = app.listen(port, function(){
    
    console.log(`Server running on http://${host}:${port}`)
});
