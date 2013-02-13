// function to send location data to the server
function putLocation(coords){
	// set up the url
	var url = "http://stormy-shelf-6456.herokuapp.com/people/50fa2a5e0f77a61e3612052e/location";
	url = url + '?lon=' + coords.longitude;
	url = url + '&lat=' + coords.latitude;
	url = url + '&acc=' + coords.accuracy;

	var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
			// nothing to receive
			alert('put location');
	    },
	    onerror: function(e) {
	        // uh oh
	        alert(e);
	    },
	    timeout: 5000
	});
	xhr.open("PUT", url);
	xhr.send();
}

// check if we have a signed up user
Ti.App.Properties.removeProperty('_id'); // force a signup
Ti.API.info('_id: ' + Ti.App.Properties.getProperty('_id'));
if(!Ti.App.Properties.hasProperty('_id')){
	// sign them up
	Ti.API.info('about to create controller');
	Alloy.createController('signup');	
	var wait = true;
}

// set a location listener, if location services are available
if (Ti.Geolocation.locationServicesEnabled) {
	// set some properties on the location module
    Ti.Geolocation.purpose = 'Let your friends know where you are';
    Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HIGH;
    Ti.Geolocation.distanceFilter = 50;
    
    // listen for location changes
    Ti.Geolocation.addEventListener('location', function(e) {
        if (e.error) {
            alert('Error: ' + e.error);
        } else {
            putLocation(e.coords);
        }
    });
} else {
    alert('Please enable location services');
}

// this is a gipsy way to do it
if(wait){
	Ti.Facebook.addEventListener('login', function(e){
		$.index.open();
	})
} else {
	$.index.open();	
}
