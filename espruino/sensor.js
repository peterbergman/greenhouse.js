function Sensor() {
  var ow = new OneWire(A1);
  this.sensorConnection = require("DS18B20").connect(ow);
  this.interval = setInterval(function() {
    var measurement = new Measurement(sensor.getTemp());
    console.log(measurement);
  }, 1000);
  Sensor.prototype.stop = function() {
    clearInterval(this.interval);
  }
}

function Measurement(temperature) {
  this.date = null;
  this.hour = null;
  this.temperature = temperature;
}
