// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date_string?", (req, res) => {
  // set the current date
  let currentDate = new Date();
  // Set the response date with current date
  let resDate = {"unix": currentDate.getTime(), "utc" : currentDate.toUTCString()};
  
  // check if date_string is empty 
  if (req.params.date_string){
    let re = /^\d+$/
    // create the request date. check if date_string is an integer 
    let reqDate = new Date(
      re.test(req.params.date_string) ? 
      parseInt(req.params.date_string, 10):
      req.params.date_string)
    // if date_string is ivalid return "Invalid Date"
    if(reqDate.toUTCString() === "Invalid Date"){
      resDate = {"error": "Invalid Date"};
    } 
    else {
      resDate.unix = reqDate.getTime();
      resDate.utc  = reqDate.toUTCString();
    }
  }
  
  res.json(resDate);
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});