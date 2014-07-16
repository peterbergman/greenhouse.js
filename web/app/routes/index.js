var express = require("express");
var mongoose = require("mongoose");
var Measurement = mongoose.model("Measurement");
var router = express.Router();

router.get("/", function(req, res) {
  res.render("index", {title : "greenhouse"});
});

router.get("/measurements/startDate", function(req, res) {
  res.send(400, {"error" : "startDate missing"});
});

router.get("/measurements/startDate/endDate", function(req, res) {
  res.send(400, {"error" : "startDate and endDate missing"});
});

router.get("/measurements/startDate/:startDate/endDate", function(req, res) {
  res.send(400, {"error" : "endDate missing"});
});

router.get("/measurements/startDate/:startDate", function(req, res) {
  var responseMeasurements = [];
  var startDate = req.params.startDate;
  var endDate = req.params.endDate;
  Measurement.find({"date" : {"$gte": new Date(startDate)}}, function(err, measurements, count){
    for (i in measurements) {
      measurements[i].date = measurements[i].date;
      responseMeasurements.push(measurements[i]);
    }
    res.jsonp(responseMeasurements);
  });
});

router.get("/measurements/startDate/:startDate/endDate/:endDate", function(req, res) {
  var responseMeasurements = [];
  var startDate = new Date(req.params.startDate);
  var startDateUTC = getUTCDate(startDate);
  var endDate = new Date(req.params.endDate);
  var endDateUTC = getUTCDate(new Date(endDate.getTime() + (23 * 60 * 60 * 1000)));
  console.log("start date: " + getUTCDate(new Date(startDate)));
  console.log("end date: " + getUTCDate(new Date(endDate)));
  Measurement.find({"date" : {"$gte": startDateUTC, "$lte": endDateUTC}}, function(err, measurements, count){
    for (i in measurements) {
      measurements[i].date = measurements[i].date;
      responseMeasurements.push(measurements[i]);
    }
    res.jsonp(responseMeasurements);
  });
});

router.get("/measurements", function(req, res) {
  var responseMeasurements = [];
  Measurement.find(function(err, measurements, count){
    for (i in measurements) {
      measurements[i].date = measurements[i].date;
      responseMeasurements.push(measurements[i]);
    }
    res.jsonp(responseMeasurements);
  });
});

router.post("/measurement", function(req, res){
  if (typeof(req.body.temperature) == "undefined") {
    res.send(400, {"error" : "temperature missing"});
  } else {
    var date = req.body.date ? new Date(req.body.date) : new Date();
    var hour = date.getHours();
    var temperature = req.body.temperature;
    var newMeasurement = new Measurement({"date": date, "temperature": temperature});
    console.log(date);
    newMeasurement.save(function (err) {
      if(err) {
        res.send({"error" : err});
      } else {
        res.send(201, {"message" : "created successfully"});
      }
    });  
  }
});

function getUTCDate(date) {
  var t = date.getTime() - (Math.abs(date.getTimezoneOffset() * 60 * 1000));
  return new Date(t);
}

module.exports = router;
