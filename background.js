if (!localStorage.isInitialized) {
  localStorage.isInitialized = true;
  localStorage.setItem('LatestDate', '');
  localStorage.setItem('currentWebsites', '{}');
  localStorage.setItem('currentHostname','');
  localStorage.setItem('backup','');

}

setInterval(function() {
    var hostname = localStorage.getItem('currentHostname');
    
    chrome.tabs.query({active: true,lastFocusedWindow: true}, function(tabs) {
            var tab = tabs[0];
           localStorage.setItem('currentHostname',extractHostname(tab.url));
    });

   if(localStorage.getItem(hostname) === null){
        localStorage.setItem(hostname,'0');       
        var websites = localStorage.getItem('currentWebsites');
        websites += (', ' + hostname);
        localStorage.setItem('currentWebsites', websites);
    }
    else{
        var seconds = parseInt(localStorage.getItem(hostname));
        localStorage.setItem(hostname,(seconds+3)); 
    }

   //alert((localStorage.getItem('currentWebsites')));
   // alert(hostname+' : '+(localStorage.getItem(hostname)));

}, 1000);

function extractHostname(url) {
    var hostname;
    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }
    hostname = hostname.split(':')[0];
    hostname = hostname.split('?')[0];
    return hostname;
}
