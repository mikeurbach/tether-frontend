// get our people collection
var friends = Alloy.createCollection('friends');

// success callback for fetch
function fetchSuccess(coll, resp, opts){
	// iterate over friends, building up data array
	var friendsData = [];
	coll.map(function(friend){
		// arguments for making a friend view
		var args = {
			name: friend.get('name')
		};
		
		// make the view, add it to the array
		var friendView = Alloy.createController('friend', args).getView();
		friendsData.push(friendView);
	});
	
	// plug the array into the table
	$.friendsTable.setData(friendsData);
}

// error callback for fetch
function fetchError(coll, xhr, opts){
	// already taken care of in restapi
}

// function to refresh the people from DB
function update(){
	// fetch the user's friends for the first time
	friends.fetch({
		success: fetchSuccess, 
		error: fetchError
	});
}

// get friends, and refresh every minute
update();
setInterval(update, 60000);
