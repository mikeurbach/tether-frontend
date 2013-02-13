function Controller() {
    function fetchSuccess(coll, resp, opts) {
        var friendsData = [];
        coll.map(function(friend) {
            var args = {
                name: friend.get("name")
            }, friendView = Alloy.createController("friend", args).getView();
            friendsData.push(friendView);
        });
        $.friendsTable.setData(friendsData);
    }
    function fetchError(coll, xhr, opts) {}
    function update() {
        friends.fetch({
            success: fetchSuccess,
            error: fetchError
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    Alloy.Collections.instance("friends");
    $.__views.__alloyId2 = A$(Ti.UI.createWindow({
        id: "__alloyId2"
    }), "Window", null);
    $.__views.__alloyId3 = Alloy.createController("friend", {
        id: "__alloyId3"
    });
    var __alloyId5 = [];
    __alloyId5.push($.__views.__alloyId3.getViewEx({
        recurse: !0
    }));
    $.__views.friendsTable = A$(Ti.UI.createTableView({
        backgroundColor: "#fff",
        data: __alloyId5,
        id: "friendsTable"
    }), "TableView", $.__views.__alloyId2);
    $.__views.__alloyId2.add($.__views.friendsTable);
    $.__views.friends = A$(Ti.UI.createTab({
        window: $.__views.__alloyId2,
        title: "Friends",
        id: "friends"
    }), "Tab", null);
    $.addTopLevelView($.__views.friends);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var friends = Alloy.createCollection("friends");
    update();
    setInterval(update, 60000);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;