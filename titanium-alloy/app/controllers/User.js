// Get argument parameter
var args = arguments[0] || {
    nickname : "",
    status : ""
};

$.nickname.text = args.nickname;
$.status.text   = args.status;
