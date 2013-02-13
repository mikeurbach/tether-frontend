function Controller() {
    function putLocation(coords) {
        var url = "http://stormy-shelf-6456.herokuapp.com/people/50fa2a5e0f77a61e3612052e/location";
        url = url + "?lon=" + coords.longitude;
        url = url + "&lat=" + coords.latitude;
        url = url + "&acc=" + coords.accuracy;
        var xhr = Ti.Network.createHTTPClient({
            onload: function(e) {
                alert("put location");
            },
            onerror: function(e) {
                alert(e);
            },
            timeout: 5000
        });
        xhr.open("PUT", url);
        xhr.send();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.index = A$(Ti.UI.createTabGroup({
        id: "index"
    }), "TabGroup", null);
    $.__views.__alloyId9 = Alloy.createController("friends", {
        id: "__alloyId9"
    });
    $.__views.index.addTab($.__views.__alloyId9.getViewEx({
        recurse: !0
    }));
    $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.App.Properties.removeProperty("_id");
    Ti.API.info("_id: " + Ti.App.Properties.getProperty("_id"));
    if (!Ti.App.Properties.hasProperty("_id")) {
        Ti.API.info("about to create controller");
        Alloy.createController("signup");
        var wait = !0;
    }
    if (Ti.Geolocation.locationServicesEnabled) {
        Ti.Geolocation.purpose = "Let your friends know where you are";
        Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HIGH;
        Ti.Geolocation.distanceFilter = 50;
        Ti.Geolocation.addEventListener("location", function(e) {
            e.error ? alert("Error: " + e.error) : putLocation(e.coords);
        });
    } else alert("Please enable location services");
    wait ? Ti.Facebook.addEventListener("login", function(e) {
        $.index.open();
    }) : $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;