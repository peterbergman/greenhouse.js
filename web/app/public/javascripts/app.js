nv.addGraph(function () {
    var chart = nv.models.lineChart().margin({
        top: 30,
        right: 20,
        bottom: 50,
        left: 20
    }).showLegend(true).tooltipContent(function (key, y, e, graph) {
        return '<h3>' + key + '</h3>' + '<p>' + e + '% at ' + y + '</p>'
    });

    chart.xAxis.tickFormat(function (d) {
        return d3.time.format('%Y-%m-%d %H')(new Date(d))
    });

    d3.select('#chart1 svg')
        .datum(data)
        .transition().duration(500)
        .call(chart);

    nv.utils.windowResize(chart.update);
    return chart;
});

function getData() {
  $.ajax({
    url: 'http://ec2-54-88-73-46.compute-1.amazonaws.com:3000/measurements/startDate/2014-07-01',
    type: 'GET',
    dataType: 'jsonp',
    jsonp: 'callback',
    sucess: function(data) {
      console.log(data);
    },
    callback: function(data) {
      console.log(data);
    }
  });
}

data = [{
    "values": [{
        "x": 1025409600000,
            "y": 2
    }, {
        "x": 1028088000000,
            "y": 4
    }, {
        "x": 1030766400000,
            "y": 1
    }, {
        "x": 1033358400000,
            "y": 3
    }, {
        "x": 1036040400000,
            "y": 0
    }, {
        "x": 1038632400000,
            "y": 3
    }],
        "key": "Temperature",
}]
