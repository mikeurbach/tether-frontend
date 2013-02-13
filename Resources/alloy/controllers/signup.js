function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.signup = A$(Ti.UI.createWindow({
        backgroundColor: "#fff",
        id: "signup"
    }), "Window", null);
    $.addTopLevelView($.__views.signup);
    $.__views.__alloyId10 = A$(Ti.Facebook.createLoginButton({
        ns: Ti.Facebook,
        id: "__alloyId10"
    }), "LoginButton", $.__views.signup);
    $.__views.signup.add($.__views.__alloyId10);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.Facebook.appid = "382224011865286";
    Ti.Facebook.permissions = [];
    Ti.Facebook.addEventListener("login", function(e) {
        e.success && Ti.Facebook.requestWithGraphPath("me", {}, "GET", function(e) {
            if (e.success) {
                Ti.API.debug(e.result);
                var url = "http://10.0.2.2:5000/people", xhr = Ti.Network.createHTTPClient({
                    onload: function(ev) {
                        Ti.API.info(this.responseText);
                        json = JSON.parse(this.responseText);
                        Ti.App.Properties.setString("_id", json._id);
                    },
                    onerror: function(ev) {
                        Ti.API.debug(ev.error);
                    },
                    timeout: 5000
                });
                xhr.open("POST", url);
                xhr.send({
                    info: e.result,
                    token: Ti.Facebook.accessToken,
                    exp: Ti.Facebook.expirationDate
                });
                $.signup.close();
            } else e.error ? Ti.API.debug(e.error) : Ti.API.debug("Unknown response");
        });
    });
    Ti.Facebook.addEventListener("logout", function(e) {
        Ti.API.debug("Logged out");
    });
    Ti.API.info("inside controller");
    $.signup.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;