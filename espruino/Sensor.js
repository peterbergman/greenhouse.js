var system = {};
system.ow = new OneWire(A1);
system.sensorConnection = require("DS18B20").connect(system.ow);
system.wlan = require("CC3000").connect();
system.http = require("http");

function Sensor() {
  var self = this;
  system.wlan.connect( "Bergman", "?????????", function (s) {
    if (s=="dhcp") {
      if (system.interval) {
        clearInterval(system.interval);
        setInterval(self.doMeasure, 5000);
      } else {
        setInterval(self.doMeasure, 5000);
      }
    }
  });
}

Sensor.prototype.stop = function() {
  clearInterval(system.interval);
};
  
Sensor.prototype.sendData = function(data) {
  console.log(data);
  system.http.get("http://www.pur3.co.uk/hello.txt", function(res) {
    res.on('data', function(data) {
      console.log(">" + data);
    });
  });
};

Sensor.prototype.doMeasure = function() {
  var measurement = new Measurement(system.sensorConnection.getTemp());
  this.sendData(measurement);
};

function Measurement(temperature) {
  this.temperature = temperature;
}

var s = new Sensor();
