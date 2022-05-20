const express = require('express');
const port = 3000;
var host = "localhost";

const app = express();



app.get("/", (req, res, next) => {
    // res.sendStatus(200);
    res.status(200).send("Hello World")
})

var server = app.listen(port, function(){
    
    console.log(`Server running on http://${host}:${port}`)
})
