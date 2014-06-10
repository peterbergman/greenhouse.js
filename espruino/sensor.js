var sensor;

(function init() {
  var ow = new OneWire(A1);
  sensor = require("DS18B20").connect(ow);
})();

setInterval(function() {
  var measurement = new Measurement(sensor.getTemp());
  console.log(measurement);
}, 1000);

function Measurement(temperature) {
  this.date = null;
  this.hour = null;
  this.temperature = temperature;
}
