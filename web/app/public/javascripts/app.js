var currentDate = new Date(-1);
(function getData() {
  $.ajax({
    url: 'http://ec2-54-88-73-46.compute-1.amazonaws.com:3000/measurements/startDate/2014-07-01',
    type: 'GET',
    dataType: 'jsonp',
    jsonpCallback: 'jsonpCallback'
  });
})();

function renderChart(data) {
  nv.addGraph(function () {
      var chart = nv.models.lineChart().margin({
          top: 30,
          right: 40,
          bottom: 50,
          left: 40
      }).showLegend(true).tooltipContent(function (key, y, e, graph) {
          return '<h3>' + key + '</h3>' + '<p>' + e + ' &deg;C at ' + y + '</p>'
      });

      chart.xAxis.ticks(5).tickFormat(function (d) {
        return d3.time.format('%H')(new Date(d))
      });
      chart.yAxis.tickFormat(d3.format(',.1f'));
      chart.xScale(d3.time.scale());

      d3.select('#chart1 svg')
          .datum(data)
          .transition().duration(500)
          .call(chart);

      nv.utils.windowResize(chart.update);
      return chart;
  });
}

function jsonpCallback(response) {
  data = [{'values': []}];
  for (i in response) {
    data[0].values.push({'x': new Date(response[i].date).getTime(), 'y': response[i].temperature});
  }
  data[0].key = 'Temperature';
  renderChart(data);
}
