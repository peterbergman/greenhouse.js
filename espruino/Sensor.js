var system = {};
system.ow = new OneWire(A1);
system.sensorConnection = require("DS18B20").connect(system.ow);
system.wlan = require("CC3000").connect();
system.http = require("http");

function Sensor() {
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
    Sensor.prototype.sendData(measurement); // Need to use the prototype since we are in an interval here
  };

  system.wlan.connect( "Bergman", "?????????", function (s) {
    if (s=="dhcp") {
      if (system.interval) {
        clearInterval(system.interval);
        setInterval(Sensor.prototype.doMeasure, 5000);
      } else {
        setInterval(Sensor.prototype.doMeasure, 5000);
      }
    }
  });
}

function Measurement(temperature) {
  this.temperature = temperature;
}

var s = new Sensor();
