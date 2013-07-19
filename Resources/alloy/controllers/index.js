function Controller() {
    function putLocation(coords) {
        if (!Ti.App.Properties.hasProperty("_id")) return;
        var person = Alloy.Models.instance("people"), params = {
            data: {
                lon: coords.longitude,
                lat: coords.latitude,
                acc: coords.accuracy
            }
        }, opts = {
            success: function(responseJSON, responseText) {},
            error: function(responseJSON, responseText) {
                alert(responseText);
            }
        };
        person.id = Ti.App.Properties.getString("_id");
        person.save(params, opts);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.index = Ti.UI.createTabGroup({
        id: "index"
    });
    $.__views.__alloyId3 = Alloy.createController("people", {
        id: "__alloyId3"
    });
    $.__views.index.addTab($.__views.__alloyId3.getViewEx({
        recurse: !0
    }));
    $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.API.info("_id (client property): " + Ti.App.Properties.getString("_id"));
    if (!Ti.App.Properties.hasProperty("_id")) var signup = Alloy.createController("signup");
    if (Ti.Geolocation.locationServicesEnabled) {
        Ti.Geolocation.purpose = "Let your friends know where you are";
        Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HIGH;
        Ti.Geolocation.distanceFilter = 100;
        Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;
        Ti.Geolocation.Android.manualMode = !0;
        var providerGps = Ti.Geolocation.Android.createLocationProvider({
            name: Ti.Geolocation.PROVIDER_GPS,
            minUpdateDistance: 100,
            minUpdateTime: 60
        });
        Ti.Geolocation.Android.addLocationProvider(providerGps);
        var ruleGps = Ti.Geolocation.Android.createLocationRule({
            provider: Ti.Geolocation.PROVIDER_GPS,
            accuracy: 50,
            maxAge: 300000
        });
        Ti.Geolocation.Android.addLocationRule(ruleGps);
        Ti.Geolocation.addEventListener("location", function(e) {
            e.error ? alert("Error: " + e.error) : putLocation(e.coords);
        });
    } else alert("Please enable location services");
    if (signup) Ti.Facebook.addEventListener("login", function(e) {
        $.index.open();
        signup.destroy();
        Ti.App.fireEvent("update_friends");
        Ti.Geolocation.locationServicesEnabled && Ti.Geolocation.getCurrentPosition(function(e) {
            putLocation(e.coords);
        });
    }); else {
        $.index.open();
        Ti.App.fireEvent("update_friends");
        Ti.Geolocation.locationServicesEnabled && Ti.Geolocation.getCurrentPosition(function(e) {
            putLocation(e.coords);
        });
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;