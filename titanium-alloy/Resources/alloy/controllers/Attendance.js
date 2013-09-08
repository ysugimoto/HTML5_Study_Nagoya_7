function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Attendance";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.Attendance = Ti.UI.createWindow({
        title: "参加者",
        id: "Attendance"
    });
    $.__views.Attendance && $.addTopLevelView($.__views.Attendance);
    $.__views.attendances = Ti.UI.createTableView({
        id: "attendances"
    });
    $.__views.Attendance.add($.__views.attendances);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.AttendanceView = $.attendances;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;