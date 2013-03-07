// function to send location data to the server
function putLocation(coords){
	// very important that we have already called person.save() once already
	if(!Ti.App.Properties.hasProperty('_id')){
		return;
	}
	
	// get our person model instance
	var person = Alloy.Models.instance('people');
	
	// set our location data
	var params = {
		data: {
			lon: coords.longitude,
			lat: coords.latitude,
			acc: coords.accuracy
		}
	};
	
	// set our callbacks
	var opts = {
		success: function(responseJSON, responseText){
			alert('put location');
		},
		error: function(responseJSON, responseText){
			alert(responseText);
		}
	};
	
	// PUT to the server
	// TODO: can we use the idAttribute here?
	person.id = Ti.App.Properties.getString('_id');
	person.save(params, opts);
}

// check if we have a signed up user
Ti.API.info('_id (client property): ' + Ti.App.Properties.getString('_id'));
//Ti.App.Properties.removeProperty('_id');
if(!Ti.App.Properties.hasProperty('_id')){
	// sign them up
	var signup = Alloy.createController('signup');	
}

// set a location listener, if location services are available
if (Ti.Geolocation.locationServicesEnabled) {
	// set some generic properties on the location module
    Ti.Geolocation.purpose = 'Let your friends know where you are';
    Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HIGH;
    Ti.Geolocation.distanceFilter = 100;
    Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;
    
	// set up custom properties for android
	Ti.Geolocation.Android.manualMode = true;
	
	var providerGps = Ti.Geolocation.Android.createLocationProvider({
    	name: Ti.Geolocation.PROVIDER_GPS,
    	minUpdateDistance: 100,
    	minUpdateTime: 60
	});
	Ti.Geolocation.Android.addLocationProvider(providerGps);

	var ruleGps = Ti.Geolocation.Android.createLocationRule({
		provider: Ti.Geolocation.PROVIDER_GPS,
		accuracy: 50,
		maxAge: 1000 * 60 * 5
	});
	Ti.Geolocation.Android.addLocationRule(ruleGps);

    
    // listen for location changes
    Ti.Geolocation.addEventListener('location', function(e) {
        if (e.error) {
            alert('Error: ' + e.error);
        } else {
       		//putLocation(e.coords);	
       	}
    });
} else {
    alert('Please enable location services');
}

// this is a gipsy way to do it
if(signup){
	Ti.Facebook.addEventListener('login', function(e){
		$.index.open();
		signup.destroy();
	})
} else {
	$.index.open();	
}
