const express        = require('express');
const nodemailer     = require('nodemailer');
const bodyParser     = require('body-parser');

const app            = express();


const port = 8080;

app.listen(port, () => {
  console.log('We are live on ' + port);
});

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/new-car', (req, res) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '****',
      pass: '****'
    }
  });
  
  const mailOptions = getOptions(req.body);
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.send();
});

const getOptions = (data) => ({
  from: 'test@gmail.com',
  to: 'amarjasarevic@hotmail.com',
  subject: 'Sending Email using Node.js with body',
  html: '<h1>Contact data</h1>' +
        '<p>Full name: <b>' + data.name + '</b></p>' +
        '<p>Email: <b>' + data.email + '</b></p>' +
        '<p>Phone: <b>' + data.phone + '</b></p>' +
        '<p>Location: <b>' + data.location + '</b></p>' +
        '<h1>Car data</h1>' +
        '<p>Brand: <b>' + data.brand + '</b></p>' +
        '<p>Type: <b>' + data.type + '</b></p>' +
        '<p>Fuel: <b>' + data.fuel + '</b></p>' +
        '<p>First registration: <b>' + data.registration + '</b></p>' +
        '<p>Mileage: <b>' + data.mileage + ' km</b></p>' +
        '<p>TÜV: <b>' + data.tuv + '</b></p>' +
        '<p>Colour: <b>' + data.colour + '</b></p>' +
        '<p>PS: <b>' + data.ps + '</b></p>' +
        '<p>Doors: <b>' + data.doors + '</b></p>' +
        '<p>Displacement: <b>' + data.displacement + '</b></p>' +
        '<p>Price: <b>' + data.price + ' €</b></p>' +
        '<p>Other info: <b>' + data.other + '</b></p>'
});
