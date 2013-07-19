function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.signup = Ti.UI.createWindow({
        backgroundColor: "#fff",
        id: "signup"
    });
    $.addTopLevelView($.__views.signup);
    $.__views.__alloyId10 = Ti.Facebook.createLoginButton({
        ns: Ti.Facebook,
        id: "__alloyId10"
    });
    $.__views.signup.add($.__views.__alloyId10);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.Facebook.appid = "382224011865286";
    Ti.Facebook.permissions = [];
    Ti.Facebook.addEventListener("login", function(e) {
        e.success && Ti.Facebook.requestWithGraphPath("me", {}, "GET", function(e) {
            if (e.success) {
                var fb_info = JSON.parse(e.result), person = Alloy.Models.instance("people"), atts = {
                    name: fb_info.name,
                    fid: fb_info.id,
                    token: Ti.Facebook.accessToken,
                    exp: Ti.Facebook.expirationDate
                }, opts = {
                    success: function(responseJSON, responseText) {
                        console.log(JSON.stringify(responseJSON));
                        Ti.API.info("_id (server generated): " + responseJSON.id);
                        Ti.App.Properties.setString("_id", responseJSON.id);
                    },
                    error: function(responseJSON, responseText) {
                        alert(responseText);
                    }
                };
                person.save(atts, opts);
            } else e.error ? Ti.API.debug(e.error) : Ti.API.debug("Unknown response");
        });
    });
    Ti.Facebook.addEventListener("logout", function(e) {
        Ti.API.debug("Logged out");
    });
    $.signup.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;