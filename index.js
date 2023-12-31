// index.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
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

// Timestamp Microservice endpoint
app.get("/api/:date?", (req, res) => {
    let date;

    // If no date parameter is provided, use the current date.
    if (!req.params.date) {
        date = new Date();
    } else {
        // Check if it's a Unix timestamp or a date string.
        const isUnixTimestamp = /^\d+$/.test(req.params.date);
        date = isUnixTimestamp ? new Date(parseInt(req.params.date)) : new Date(req.params.date);
    }

    // If the date is invalid, return an error.
    if (isNaN(date.getTime())) {
        res.json({ error: "Invalid Date" });
    } else {
        res.json({
            unix: date.getTime(),
            utc: date.toUTCString()
        });
    }
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
