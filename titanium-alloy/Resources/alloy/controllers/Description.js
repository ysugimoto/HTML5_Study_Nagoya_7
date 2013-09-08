function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Description";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.Description = Ti.UI.createWindow({
        title: "イベント概要",
        id: "Description"
    });
    $.__views.Description && $.addTopLevelView($.__views.Description);
    $.__views.__alloyId5 = Ti.UI.createTableViewRow({
        id: "__alloyId5"
    });
    var __alloyId6 = [];
    __alloyId6.push($.__views.__alloyId5);
    $.__views.title = Ti.UI.createLabel({
        font: {
            fontSize: "18dp"
        },
        left: "10dp",
        top: "10dp",
        bottom: 10,
        id: "title",
        text: "イベント名"
    });
    $.__views.__alloyId5.add($.__views.title);
    $.__views.titlevalue = Ti.UI.createLabel({
        font: {
            fontSize: "18dp"
        },
        right: 10,
        id: "titlevalue"
    });
    $.__views.__alloyId5.add($.__views.titlevalue);
    $.__views.__alloyId7 = Ti.UI.createTableViewRow({
        id: "__alloyId7"
    });
    __alloyId6.push($.__views.__alloyId7);
    $.__views.limit = Ti.UI.createLabel({
        font: {
            fontSize: "18dp"
        },
        left: "10dp",
        top: "10dp",
        bottom: 10,
        id: "limit",
        text: "定員"
    });
    $.__views.__alloyId7.add($.__views.limit);
    $.__views.limitvalue = Ti.UI.createLabel({
        font: {
            fontSize: "18dp"
        },
        right: 10,
        id: "limitvalue"
    });
    $.__views.__alloyId7.add($.__views.limitvalue);
    $.__views.__alloyId8 = Ti.UI.createTableViewRow({
        id: "__alloyId8"
    });
    __alloyId6.push($.__views.__alloyId8);
    $.__views.accepted = Ti.UI.createLabel({
        font: {
            fontSize: "18dp"
        },
        left: "10dp",
        top: "10dp",
        bottom: 10,
        id: "accepted",
        text: "参加者"
    });
    $.__views.__alloyId8.add($.__views.accepted);
    $.__views.acceptedvalue = Ti.UI.createLabel({
        font: {
            fontSize: "18dp"
        },
        right: 10,
        id: "acceptedvalue"
    });
    $.__views.__alloyId8.add($.__views.acceptedvalue);
    $.__views.__alloyId9 = Ti.UI.createTableViewRow({
        id: "__alloyId9"
    });
    __alloyId6.push($.__views.__alloyId9);
    $.__views.waiting = Ti.UI.createLabel({
        font: {
            fontSize: "18dp"
        },
        left: "10dp",
        top: "10dp",
        bottom: 10,
        id: "waiting",
        text: "補欠者"
    });
    $.__views.__alloyId9.add($.__views.waiting);
    $.__views.waitingvalue = Ti.UI.createLabel({
        font: {
            fontSize: "18dp"
        },
        right: 10,
        id: "waitingvalue"
    });
    $.__views.__alloyId9.add($.__views.waitingvalue);
    $.__views.desc = Ti.UI.createTableView({
        data: __alloyId6,
        id: "desc"
    });
    $.__views.Description.add($.__views.desc);
    $.__views.loading = Alloy.createWidget("com.appcelerator.loading", "widget", {
        id: "loading",
        __parentSymbol: $.__views.Description
    });
    $.__views.loading.setParent($.__views.Description);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.loading.setOpacity(1);
    var request = Ti.Network.createHTTPClient({
        timeout: 5e3
    }), url = "http://www.zusaar.com/api/event/user/?event_id=984003";
    request.open("GET", url);
    request.onload = function() {
        var user, attendance = Alloy.Globals.AttendanceView, json = JSON.parse(request.responseText), event = json.event[0], users = event.users, size = users.length, i = 0;
        $.titlevalue.text = event.title;
        $.limitvalue.text = event.limit + "人";
        $.acceptedvalue.text = event.accepted + "人";
        $.waitingvalue.text = event.waiting + "人";
        for (;size > i; ++i) {
            user = Alloy.createController("User", {
                user_id: users[i].user_id,
                nickname: users[i].nickname,
                status: users[i].status > 0 ? "" : "補欠"
            });
            attendance.appendRow(user.getView());
        }
        $.loading.setOpacity(0);
    };
    request.onerror = function() {
        $.loading.setOpacity(0);
        Ti.API.error("読み込みに失敗しました><");
    };
    request.send(null);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;