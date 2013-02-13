function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.window = A$(Ti.UI.createWindow({
        id: "window",
        title: "Require"
    }), "Window", null);
    $.__views.places = A$(Ti.UI.createTab({
        window: $.__views.window,
        title: "<Require>",
        id: "places"
    }), "Tab", null);
    $.addTopLevelView($.__views.places);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;