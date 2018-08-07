const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');
const app = express()
const apiKey = '1f9c49dcd51528d9097e397636dee9ce';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var fs = require('fs');
var dir = path.join(__dirname, '');
var mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
};

app.get('*', function (req, res) {
    var file = path.join(dir, req.path.replace(/\/$/, '/index.html'));
    if (file.indexOf(dir + path.sep) !== 0) {
        return res.status(403).end('Forbidden');
    }
    var type = mime[path.extname(file).slice(1)] || 'text/plain';
    var s = fs.createReadStream(file);
    s.on('open', function () {
        res.set('Content-Type', type);
        s.pipe(res);
    });
    s.on('error', function () {
        res.set('Content-Type', 'text/plain');
        res.status(404).end('Not found');
    });
});

app.post('/get_weather_by_city', function (req, res) {
  
  let city = req.body.city;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

  console.log(req.body);
  request(url, { json: true }, (err, response, body) => {
    if (err) { return console.log(err); }
        console.log(body.url);
        res.json(body);
    });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})