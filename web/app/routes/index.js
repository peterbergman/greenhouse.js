var express = require('express');
var mongoose = require('mongoose');
var Measurement = mongoose.model('Measurement');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index', {title : 'greenhouse'});
});

router.get('/measurements/startDate', function(req, res) {
  res.send(400, {'error' : 'startDate missing'});
});

router.get('/measurements/startDate/endDate', function(req, res) {
  res.send(400, {'error' : 'startDate and endDate missing'});
});

router.get('/measurements/startDate/:startDate/endDate', function(req, res) {
  res.send(400, {'error' : 'endDate missing'});
});

router.get('/measurements/startDate/:startDate', function(req, res) {
  var responseMeasurements = [];
  var startDate = req.params.startDate;
  var endDate = req.params.endDate;
  Measurement.find({'date' : {'$gte': new Date(startDate)}}, function(err, measurements, count){
    for (i in measurements) {
      measurements[i].date = measurements[i].date;
      responseMeasurements.push(measurements[i]);
    }
    res.jsonp(responseMeasurements);
  });
});

router.get('/measurements/startDate/:startDate/endDate/:endDate', function(req, res) {
  var responseMeasurements = [];
  var startDate = req.params.startDate;
  var endDate = req.params.endDate;
  Measurement.find({'date' : {'$gte': new Date(startDate), '$lte': new Date(endDate)}}, function(err, measurements, count){
    for (i in measurements) {
      measurements[i].date = getCorrectDate(measurements[i].date);
      responseMeasurements.push(measurements[i]);
    }
    res.jsonp(responseMeasurements);
  });
});

router.get('/measurements', function(req, res) {
  var responseMeasurements = [];
  Measurement.find(function(err, measurements, count){
    for (i in measurements) {
      measurements[i].date = getCorrectDate(measurements[i].date);
      responseMeasurements.push(measurements[i]);
    }
    res.send(responseMeasurements);
  });
});

router.post('/measurement', function(req, res){
  var date = req.body.date ? new Date(req.body.date) : new Date();
  var hour = date.getHours();
  var temperature = req.body.temperature;
  var newMeasurement = new Measurement({"hour": hour, "date": date, "temperature": temperature});
  console.log(newMeasurement);
  newMeasurement.save(function (err) {
    if(err) {
      res.send({'error' : err});
    } else {
      res.send(201, {'message' : 'created successfully'});
    }
  });
});

function getCorrectDate(wrongDate) {
  var t = wrongDate.getTime() + (Math.abs(wrongDate.getTimezoneOffset() * 60 * 1000));
  return new Date(t);
}

module.exports = router;
