exports.definition = {
	config: {
		"URL": "http://stormy-shelf-6456.herokuapp.com/people/50fa2a5e0f77a61e3612052e/friends",
		"adapter": {
			"type": "restapi",
			"collection_name": "friends"
		}
	},
	extendModel: function(Model) {      
        _.extend(Model.prototype, {});
        return Model;
    },  
    extendCollection: function(Collection) {        
        _.extend(Collection.prototype, {});
        return Collection;
    }
}
