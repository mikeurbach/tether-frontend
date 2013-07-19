// Set up App ID and specific permissions
Ti.Facebook.appid = '382224011865286';
Ti.Facebook.permissions = [];

// Function to be run on Facebook signup
Ti.Facebook.addEventListener('login', function(e) {
    // If we successfully logged in with Facebook
    // TODO: what if we didn't?
    if (e.success) {
    	// Get the new user's basic info and save it on the server
		Ti.Facebook.requestWithGraphPath('me', {}, 'GET', function(e) {
		    if (e.success) {
		    	// If we got a response from Facebook
		        var fb_info = JSON.parse(e.result);
		        
		        // Get our person model instance
		        var person = Alloy.Models.instance('people');
		        
		        // set up some attributes to send for the create
		        var atts = {
		        	name: fb_info.name,
		        	fid: fb_info.id,
		        	token: Ti.Facebook.accessToken,
		        	exp: Ti.Facebook.expirationDate
		        };
		        
		        // success and error callbacks
		        var opts = {
		        	success: function(responseJSON, responseText){
		        		console.log(JSON.stringify(responseJSON));
		        		Ti.API.info('_id (server generated): ' + responseJSON.id);
		        		Ti.App.Properties.setString('_id', responseJSON.id);
		        	},
		        	error: function(responseJSON, responseText){
		        		// already taken care of in restapi
		        		alert(responseText);
		        	}
		        };
		        
		        // POST the new user
		        person.save(atts, opts);
		    } else if (e.error) {
		    	// If we got an error from Facebook
		        Ti.API.debug(e.error);
		    } else {
		    	// If we got something else
		        Ti.API.debug('Unknown response');
		    }
		});
    }
});

// Function to be run on Facebook logout
Ti.Facebook.addEventListener('logout', function(e) {
    Ti.API.debug('Logged out');
});

$.signup.open();
