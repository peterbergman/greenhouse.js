$(function(){
  greenhouse = new Greenhouse();
  var statistics = greenhouse.getStatistics("2014-06-01", "2014-06-10");
  greenhouse.showStatistics(statistics);
});

function Greenhouse() {
  Greenhouse.prototype.getStatistics = function(startDate, endDate) {
    return dummyData;
  }
  Greenhouse.prototype.showStatistics = function(statistics) {
    for (var i in statistics) {
      console.log(statistics[i]);
    }
  }
}

function Measurement(date, hour, temperature) {
  this.date = date;
  this.hour = hour;
  this.temperature = temperature;
}

var dummyData = [
  new Measurement("2014-06-01", 0, 12.2),
  new Measurement("2014-06-01", 1, 13.1),
  new Measurement("2014-06-01", 2, 14.1),
  new Measurement("2014-06-01", 3, 15.1),
  new Measurement("2014-06-01", 4, 16.1),
  new Measurement("2014-06-01", 5, 17.1),
  new Measurement("2014-06-01", 6, 30.1),
  new Measurement("2014-06-01", 7, 30.1),
  new Measurement("2014-06-01", 8, 30.1),
  new Measurement("2014-06-01", 9, 30.1),
  new Measurement("2014-06-01", 10, 30.1),
  new Measurement("2014-06-01", 11, 30.1),
  new Measurement("2014-06-01", 12, 30.1),
  new Measurement("2014-06-01", 13, 30.1),
  new Measurement("2014-06-01", 14, 30.1),
  new Measurement("2014-06-01", 15, 30.1),
  new Measurement("2014-06-01", 16, 30.1),
  new Measurement("2014-06-01", 17, 30.1),
  new Measurement("2014-06-01", 18, 30.1),
  new Measurement("2014-06-01", 19, 30.1),
  new Measurement("2014-06-01", 20, 30.1),
  new Measurement("2014-06-01", 21, 30.1),
  new Measurement("2014-06-01", 22, 30.1),
  new Measurement("2014-06-01", 23, 30.1)
]
