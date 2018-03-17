var count = 0;

var keys = ['url_', 'key_', 'inactive_']

var row = '\
	<h1> Web-site #{i} </h1>\
	\
	<a> URL: </a>\
	<input type="text" value = "{url}" placeholder="http://example.com" id="url_{i}"/>\
	<br>\
	\
	<a> Time: </a>\
	<input type="text" value = "{time}" placeholder="HH:MM" id="time_{i}" />\
	<br>\
	\
	<a> Count inactive tabs: </a>\
	<input type="checkbox" id="inactive_{i}" {inactive}>\
	\
	<div id="status">\
	</div>';

$(document).ready(function() {	
	$("#save").click(function() {
		saveData();
	});
	$("#add").click(function() {
		addRow();
	});
	
	loadData();
});
	
function loadData() {
	chrome.storage.sync.get(null, function (result) {
        var count = result.count
		
		if (!count || count < 1) {
			return;
		}
		
		var urls = [null]
		var times = [null]
		var inactives = [null]
	
		for (var i = 1; i <= count; ++i) {
			urls.push(result["url_" + i]);
			times.push(result["time_" + i]);
			inactives.push(result["inactive_" + i] ? "checked" : "");
		}
		
		showData(count, urls, times, inactives);
    });
}
	
function showData(count, urls, times, inactives) {	
	for (var i = 1; i <= count; ++i) {
		addRow(urls[i], times[i], inactives[i]);
	}
}
	
function addRow(url = "", time = "", inactive = "") {
	++count;
	
    var div = document.createElement('div');

    div.className = 'row';

    div.innerHTML = format(row, {"i" : count, "url" : url, "time" : time, "inactive" : inactive});
	
    document.getElementById('main').appendChild(div);
}

function saveRow(i) {	
	var url = $("#url_" + i).val();
	var time = $("#time_" + i).val();
	var inactive = $("#inactive_" + i).is(":checked");
	
	var urlKey = "url_" + i;
	var timeKey = "time_" + i;
	var inactiveKey = "inactive_" + i;

    var jsonfile = {};
    jsonfile[urlKey] = url;
    jsonfile[timeKey] = time;
    jsonfile[inactiveKey] = inactive;
	
    chrome.storage.sync.set(jsonfile, function () {
    });
}

function saveData() {
	chrome.storage.sync.set({"count" : count}, function(){});
	for (var i = 1; i <= count; ++i) {
		saveRow(i);
	}
}

function format(str, col) {
    col = typeof col === 'object' ? col : Array.prototype.slice.call(arguments, 1);

    return str.replace(/\{\{|\}\}|\{(\w+)\}/g, function (m, n) {
        if (m == "{{") { return "{"; }
        if (m == "}}") { return "}"; }
        return col[n];
    });
};
