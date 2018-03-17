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

var today = document.getElementById('today');
var week = document.getElementById('week');
var month = document.getElementById('month');

today.addEventListener ('click', function () {
  week.classList.remove('chosen');
  today.classList.add('chosen');
  month.classList.remove('chosen');  
});
week.addEventListener ('click', function () {
  week.classList.add('chosen');
  today.classList.remove('chosen');
  month.classList.remove('chosen');  
});
month.addEventListener ('click', function () {
  week.classList.remove('chosen');
  today.classList.remove('chosen');
  month.classList.add('chosen');  
});

/* Handlebars */

$(function () {
  var tmp   = $('#table-tmp');
  var place = $('#table');

  var source   = 
    '<table>' +
      '<thead>' +
        '<th>Site</th>' +
        '<th>Percentage</th>' +
        '<th>Time</th>' +
    '</thead>' +
          '<tbody>' +
            '{{#websites}}' +
              '<tr>' +
                '<td>{{site}}</td>'+
                '<td>{{percent}}</td>' +
                '<td>{{time}}</td>'+
              '</tr>'+
            '{{/websites}}'+
          '</tbody>'+
        '</table>';
  var template = Handlebars.compile(source);
  var data = { websites: [
      {site: "Facebook.com", percent: "10%", time: "11 min" },
      {site: "Google.com", percent: "20%", time: "22 min" },
      {site: "Youtube.com", percent: "70%", time: "1h 17min" }
    ]};

  place.html (template (data));
});
