function timeChecker() {
	chrome.storage.sync.get(null, function (result) {

        var count = result.count

        if (!count || count < 1) {
			return;
		}
		
		var urls = [null]
		var times = [null]
		var inactives = [null]
	
		for (var i = 1; i <= count; ++i) {
			if (result["time_" + i]) {
				//Checking exceeding time
				var notifications = {
					type = 'basic',
					iconUrl = 'Icon48.png',
					title = 'You exceeded the time of use!',
					message = "Your are in " + result["url_" + i] + " more than " + result["time_" + i]
				}
				chrome.notifications.create('limitNotification', notifications);
			}
			/*
			urls.push(result["url_" + i]);
			times.push(result["time_" + i]);
			inactives.push(result["inactive_" + i] ? "checked" : "");
			*/
		}
		
    });
}