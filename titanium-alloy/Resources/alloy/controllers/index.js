function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createTabGroup({
        id: "index"
    });
    $.__views.__alloyId1 = Alloy.createController("Description", {
        id: "__alloyId1"
    });
    $.__views.description = Ti.UI.createTab({
        window: $.__views.__alloyId1.getViewEx({
            recurse: true
        }),
        title: "概要",
        id: "description"
    });
    $.__views.index.addTab($.__views.description);
    $.__views.__alloyId3 = Alloy.createController("Attendance", {
        id: "__alloyId3"
    });
    $.__views.attendance = Ti.UI.createTab({
        window: $.__views.__alloyId3.getViewEx({
            recurse: true
        }),
        title: "参加者",
        id: "attendance"
    });
    $.__views.index.addTab($.__views.attendance);
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.addEventListener("open", function(evt) {
        Alloy.Globals.currentTab = evt.activeTab;
    });
    $.index.addEventListener("focus", function(evt) {
        Alloy.Globals.currentTab = evt.tab;
    });
    $.index.addEventListener("close", function() {
        $.destroy();
    });
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;