var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.send('nothing yet...');
});

router.get('/measurements/startDate', function(req, res) {
  res.send(400, {'error' : 'please supply a start date'});
});

router.get('/measurements/startDate/endDate', function(req, res) {
  res.send(400, {'error' : 'please supply a start date and an end date'});
});

router.get('/measurements/startDate/:startDate/endDate', function(req, res) {
  res.send(400, {'error' : 'please supply an end date'});
});

router.get('/measurements/startDate/:startDate', function(req, res) {
  res.send(501, {'error' : 'not implemented yet'});
});

router.get('/measurements', function(req, res) {
  res.send(501, {'error' : 'not implemented yet'});
});

router.get('/measurements/startDate/:startDate/endDate/:endDate', function(req, res) {
  console.log(req.params);
  var response = {};
  var measurements = [];
  var startDate = req.params.startDate;
  var endDate = req.params.endDate;
  response.startDate = startDate;
  response.endDate = endDate;
  measurements.push(new Measurement(22.3));
  measurements.push(new Measurement(23.3));
  measurements.push(new Measurement(24.3));
  measurements.push(new Measurement(25.3));
  response.measurements = measurements;
  res.send(response);
});

function Measurement(temperature) {
  this.date = null;
  this.hour = null;
  this.temperature = temperature;
}

module.exports = router;
