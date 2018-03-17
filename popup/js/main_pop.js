var randomScalingFactor = function() {
  return Math.round(Math.random() * 100);
};

var config = {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [
	  randomScalingFactor(),
	  randomScalingFactor(),
	  randomScalingFactor(),
	  randomScalingFactor(),
	  randomScalingFactor(),
	],
	backgroundColor: [
	  window.chartColors.red,
	  window.chartColors.orange,
	  window.chartColors.yellow,
	  window.chartColors.green,
	  window.chartColors.blue,
	],
	label: 'Data'
      }],
      labels: [
        'Facebook',
	'VK',
	'Yandex',
	'Google',
	'YouTube'
      ]
    },
    options: {
      //      responsive: true,
      maintainAspectRatio: true,
      legend: {
        display: true,
        padding: 3,
        position: 'bottom',
      }
    }
};

window.onload = function() {
  var ctx = document.getElementById('chart-area').getContext('2d');
  window.myPie = new Chart(ctx, config);
};

var colorNames = Object.keys(window.chartColors);

/*
 * document.getElementById('addDataset').addEventListener('click', function() {
  var newDataset = {
    backgroundColor: [],
    data: [],
    label: 'New dataset ' + config.data.datasets.length,
  };

  for (var index = 0; index < config.data.labels.length; ++index) {
    newDataset.data.push(randomScalingFactor());
    var colorName = colorNames[index % colorNames.length];
    var newColor = window.chartColors[colorName];
    newDataset.backgroundColor.push(newColor);
  }

  config.data.datasets.push(newDataset);
  window.myPie.update();
});
*/


/* Events */
var stat = document.getElementById('stats');
var options = document.getElementById('options');
document.getElementById('showStat').addEventListener ('click', function () {
  options.style.display = 'none';
  stat.style.display = 'block';
});
document.getElementById('showOpt').addEventListener ('click', function () {
  options.style.display = 'block';
  stat.style.display = 'none';
});
