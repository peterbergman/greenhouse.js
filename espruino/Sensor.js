function Sensor() {
  var ow = new OneWire(A1);
  this.sensorConnection = require("DS18B20").connect(ow);
  Sensor.prototype.stop = function() {
    clearInterval(this.interval);
  }
  Sensor.prototype.sendData = function(data) {
    console.log(data);
  }
  Sensor.prototype.doMeasure = function() {
    var measurement = new Measurement(sensorConnection.getTemp());
    Sensor.prototype.sendData(measurement);
  }
  this.interval = setInterval(this.doMeasure, 1000);
}

function Measurement(temperature) {
  this.date = null;
  this.hour = null;
  this.temperature = temperature;
}
