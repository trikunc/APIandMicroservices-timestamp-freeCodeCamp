// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

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



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


app.get("/api/timestamp", (req, res) => {
  let resObj = {}
  let objDate = new Date()
  let unixValue = objDate.getTime()
  let utcValue = objDate.toUTCString()
  resObj["unix"] = unixValue
  resObj["utc"] = utcValue
  res.json(resObj);
})

app.get("/api/timestamp/:date", (req, res) => {
  let resObj = {}
  let date_string = req.params.date
  let timeStamp
  let unixValue;
  let utcValue;
  let isNum = /^\d+$/.test(date_string)
  console.log(isNum);
 
  if(isNum) {
    timeStamp = new Date(parseInt(date_string))
    unixValue = timeStamp.valueOf()
    utcValue = timeStamp.toUTCString()
  } else {
    timeStamp = new Date(date_string)
    unixValue = timeStamp.valueOf()
    utcValue = timeStamp.toUTCString()
  }
  
   console.log("utcValue:", utcValue)
   if (utcValue == "Invalid Date") {
    console.log("if true run")
    resObj["error"] = "Invalid Date"  
    res.json(resObj);

  } else {
    console.log("else run")
    resObj["unix"] = unixValue
    resObj["utc"] = utcValue
    res.json(resObj);

  }
})

