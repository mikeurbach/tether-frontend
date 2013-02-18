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
		        Ti.API.debug(e.result);
		        
		        // Set up a connection to our server
		        var url = "http://10.0.2.2:5000/people";
				var xhr = Ti.Network.createHTTPClient({
 				    onload: function(ev) {
						// Save the user's id
				        Ti.API.info(this.responseText);
				        json = JSON.parse(this.responseText);
				        console.log(json);
				        // Ti.App.Properties.setString('_id', json._id);
				    },
				    onerror: function(ev) {
						// this function is called when an error occurs, including a timeout
				        Ti.API.info(ev.error);
				    },
				    timeout:5000  /* in milliseconds */
				});
				
				// POST the Facebook info to /people
				xhr.open("POST", url);
				xhr.send({
					info: e.result,
					token: Ti.Facebook.accessToken,
					exp: Ti.Facebook.expirationDate
				});
				
				$.signup.close();
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

Ti.API.info('inside controller');
$.signup.open();
