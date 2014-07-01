var express = require('express');
var mongoose = require('mongoose');
var Measurement = mongoose.model( 'Measurement' );
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index', {title : 'greenhouse'});
});

router.get('/measurements/startDate', function(req, res) {
  res.send(400, {'error' : 'please specify a start date'});
});

router.get('/measurements/startDate/endDate', function(req, res) {
  res.send(400, {'error' : 'please specify a start date and an end date'});
});

router.get('/measurements/startDate/:startDate/endDate', function(req, res) {
  res.send(400, {'error' : 'please specify an end date'});
});

router.get('/measurements/startDate/:startDate', function(req, res) {
  res.send(501, {'error' : 'not implemented yet'});
});

router.get('/measurements', function(req, res) {
  Measurement.find(function(err, measurements, count){
    res.send(measurements);
  });
});

router.get('/measurements/startDate/:startDate/endDate/:endDate', function(req, res) {
  res.send(501, {'error' : 'not implemented yet'});
});

router.post('/measurement', function(req, res){
  var date = new Date();
  var hour = date.getHours();
  var temperature = req.body.temperature;
  var newMeasurement = new Measurement({"hour": hour, "date": date, "temperature": temperature});
  console.log(newMeasurement);
  newMeasurement.save(function (err) {
    if(err) {
      res.send({'error' : err});
    } else {
      res.send(201, {'message' : 'created successfully!'});
    }
  });
});

module.exports = router;
