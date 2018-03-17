var randomScalingFactor = function() {
  return Math.round(Math.random() * 100);
};

var DB_today = {
  urls: [
    'facebook.com',
    'vk.com',
    'youtube.com',
    'google.com',
    'reddit.com',
    'codeforces.com',
  ],
  times: [
    300,
    400,
    123,
    500,
    70,
    5000,
  ]
};
var DB_week = {
  urls: [
    'facebook.com',
    'vk.com',
    'youtube.com',
    'google.com',
    'reddit.com',
    'codeforces.com',
  ],
  times: [
    8000,
    4400,
    1243,
    5020,
    720,
    5000,
  ]
};
var DB_month = {
  urls: [
    'facebook.com',
    'vk.com',
    'youtube.com',
    'google.com',
    'reddit.com',
    'codeforces.com',
  ],
  times: [
    32200,
    40220,
    1203,
    5080,
    7072,
    5000,
  ]
};


var DB = DB_today; //default

function Normalize (data) {
  var result = [];
  var total = 0;
  for (var i = 0; i < data.length; i++)
    total += data[i];
  for (var i = 0; i < data.length; i++)
    result.push(parseInt(100 * data[i]/total));
  return result;
}

var config = {
    type: 'pie',
    data: {
      datasets: [{
        data: Normalize (DB.times),
	backgroundColor: [
	  window.chartColors.red,
	  window.chartColors.orange,
	  window.chartColors.yellow,
	  window.chartColors.green,
          window.chartColors.blue,
          Samples.utils.color(0),
          Samples.utils.color(1),
          Samples.utils.color(2),
          Samples.utils.color(3),
          Samples.utils.color(4),
          Samples.utils.color(5),          
	],
	label: 'Data'
      }],
      labels: DB.urls,
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
  DB = DB_today;
  updateAll();
});
week.addEventListener ('click', function () {
  week.classList.add('chosen');
  today.classList.remove('chosen');
  month.classList.remove('chosen');
  DB = DB_week;
  updateAll();
});
month.addEventListener ('click', function () {
  week.classList.remove('chosen');
  today.classList.remove('chosen');
  month.classList.add('chosen');  
  DB = DB_month;
  updateAll();
});


/* Retrieving Data */

//TODO

/* Handlebars / Changing Table */

function DataPrep (url, percents, seconds) {
  var res = [];
  for (var i = 0; i < url.length; i++) {
    var time = '', cur = seconds[i];
    if (cur >= 86400)
      time += parseInt (cur / 86400) + 'd ';
    cur %= 86400;
    if (cur >= 3600)
      time += parseInt (cur / 3600) + 'h ';
    cur %= 3600;
    if (cur >= 60)
      time += parseInt (cur / 60) + 'm ';
    cur %= 60;
    time += cur + 's';

    res.push ({
      site: url[i],
      percent: percents[i] + '%',
      time: time
    });
  }
  return res;
}

function updateAll () {
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
                  '<td><b>{{site}}</b></td>'+
                  '<td>{{percent}}</td>' +
                  '<td>{{time}}</td>'+
                '</tr>'+
              '{{/websites}}'+
            '</tbody>'+
          '</table>';
    var template = Handlebars.compile(source);
    var data = { websites: DataPrep(DB.urls, Normalize(DB.times), DB.times) };

    place.html (template (data));
  });
}

updateAll();
