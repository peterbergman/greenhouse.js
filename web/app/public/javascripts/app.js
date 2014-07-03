var app = {};
app.constants = {
  months : [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ]
};
app.data = {
  points : []
};

(function getData() {
  $.ajax({
    url: "http://ec2-54-88-73-46.compute-1.amazonaws.com:3000/measurements/",
    type: "GET",
    dataType: "jsonp",
    jsonpCallback: "jsonpCallback"
  });
})();

function renderChart(data) {
  var ctx = $("#chart").get(0).getContext("2d");
  var chart = new Chart(ctx).Line(data, {pointHitDetectionRadius : 5});
}

function jsonpCallback(response) {
  var data = [];
  data.labels = [];
  data.datasets = [{
            label: "Temperature",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: []
        }];
  for (i in response) {
    app.data.points.push({"date": new Date(response[i].date), "temperature": response[i].temperature});
    data.datasets[0].data.push(response[i].temperature);
    data.labels.push(new Date(response[i].date).getHours() + ":00");
  }
  renderChart(data);
}
