function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "User";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.user = Ti.UI.createTableViewRow({
        id: "user"
    });
    $.__views.user && $.addTopLevelView($.__views.user);
    $.__views.nickname = Ti.UI.createLabel({
        top: "10dp",
        bottom: 10,
        left: "10dp",
        font: {
            fontSize: "18dp"
        },
        id: "nickname"
    });
    $.__views.user.add($.__views.nickname);
    $.__views.status = Ti.UI.createLabel({
        top: "10dp",
        bottom: 10,
        right: 10,
        font: {
            fontSize: "18dp"
        },
        id: "status"
    });
    $.__views.user.add($.__views.status);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {
        nickname: "",
        status: ""
    };
    $.nickname.text = args.nickname;
    $.status.text = args.status;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;