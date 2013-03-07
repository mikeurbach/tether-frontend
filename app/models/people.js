exports.definition = {
	config: {
		//"URL": "http://10.0.2.2:5000/people",
		"URL": "http://stormy-shelf-6456.herokuapp.com/people",
		"adapter": {
			"type": "restapi",
			"collection_name": "people"
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
