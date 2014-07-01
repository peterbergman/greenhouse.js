var express = require('express');
var router = express.Router();

router.get('/measurements/:id', function(req, res) {
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
