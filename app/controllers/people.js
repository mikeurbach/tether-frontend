// get our people collection
var friends = Alloy.createCollection('people');

// success callback for fetch
function fetchSuccess(coll, resp, opts){
	// iterate over friends, building up data array
	var friendsData = [];
	coll.map(function(friend){
		Ti.API.info(JSON.stringify(friend));

		// arguments for making a friend view
		var args = {
			name: friend.attributes.name,
			place: friend.attributes.location.place_name
		};
		
		// make the view, add it to the array
		var friendView = Alloy.createController('person', args).getView();
		friendsData.push(friendView);
	});
	
	// plug the array into the table
	$.friendsTable.setData(friendsData);
}

// error callback for fetch
function fetchError(coll, xhr, opts){
	// already taken care of in restapi
}


// listen for update_friends event
Ti.App.addEventListener('update_friends', function(){
	// fetch the user's friends 
	friends.fetch({
		success: fetchSuccess, 
		error: fetchError,
		urlparams: {
			'_id': Ti.App.Properties.getString('_id')
		}
	})
});

// update friends now, and every minute
Ti.App.fireEvent('update_friends');
setInterval(function(){
	Ti.App.fireEvent('update_friends');
}, 60000);
