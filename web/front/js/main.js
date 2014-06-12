$(function(){
  greenhouse = new Greenhouse();
  greenhouse.getStatistics("2014-06-01", "2014-06-10");
});

function Greenhouse() {
  Greenhouse.prototype.getStatistics = function(startDate, endDate) {
    console.log("Getting statistics for " + startDate + " to " + endDate);
  }
}
