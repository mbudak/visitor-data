const express = require('express');
const port = 8080;
var host = "localhost";

const app = express();



app.get("/", (req, res, next) => {
    
    const DeviceDetector = require('node-device-detector');
    const userAgent = 'Mozilla/5.0 (Linux; Android 5.0; NX505J Build/KVT49L) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.78 Mobile Safari/537.36';
    const detector = new DeviceDetector;
    const result = detector.parseClient(userAgent);
    

    // console.log('ip', req.ip);
    
    // res.sendStatus(200);
    res.status(200).send("result");
})

var server = app.listen(port, function(){
    
    console.log(`Server running on http://${host}:${port}`)
})
