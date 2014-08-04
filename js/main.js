// Get the wods
$.ajax({
  url: '/crossfit-games/js/wods.json',
  dataType: 'json',
  async: false,
  success: function(wods) {
    window.wods = wods;
  }
});

// Get the athletes
$.ajax({
  url: '/crossfit-games/js/athletes.json',
  dataType: 'json',
  async: false,
  success: function(athletes) {
    window.athletes = athletes.slice(0,10);
  }
});

// Give the athletes ownership of their scores
_.each(athletes, function(athlete) {
  athlete.scores = [];
  var runningPoints = 0;

  _.each(wods, function(wod) {
    var wodScore = _.find(wod.scores, function(score) {
      return score.athleteId === athlete.id;
    });

    runningPoints += wodScore.points;
    wodScore.runningPoints = runningPoints;

    athlete.scores.push( wodScore );
  });

});

// Charts
var data = {};
data.labels = _.pluck( wods, 'name');
data.datasets = [];

_.each(athletes, function(athlete) {
 var resultData = {
    label: athlete.name,
    strokeColor: "rgba(220,220,220,1)",
    pointColor: "rgba(220,220,220,1)",
    pointStrokeColor: "#fff",
    pointHighlightFill: "#fff",
    pointHighlightStroke: "rgba(220,220,220,1)",
    data: _.pluck(athlete.scores, 'runningPoints')
  };

  data.datasets.push( resultData );
});

var ctx = $("#myChart").get(0).getContext("2d");
var options = {
  datasetFill: false,
  datasetStrokeWidth: 1,
  pointDotRadius: 3
};
var myLineChart = new Chart(ctx).Line(data, options);
