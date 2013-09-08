// Loading animation
$.loading.setOpacity(1.0);

// Request API
var request = Ti.Network.createHTTPClient({ timeout: 5000 }),
    url = 'http://www.zusaar.com/api/event/user/?event_id=984003';

request.open("GET", url);
request.onload = function() {
    // Parse response
    var attendance = Alloy.Globals.AttendanceView,
        json  = JSON.parse(request.responseText),
        event = json.event[0],
        users = event.users,
        size  = users.length,
        i     = 0,
        user;
    
    // Set description message
    $.titlevalue.text    = event.title;
    $.limitvalue.text    = event.limit + '人';
    $.acceptedvalue.text = event.accepted + '人';
    $.waitingvalue.text  = event.waiting + '人';
    
    // Create user data view
    for ( ; i < size; ++i ) {
        user = Alloy.createController('User', {
            user_id: users[i].user_id,
            nickname: users[i].nickname,
            status: ( users[i].status > 0 ) ? '' : '補欠'
        });
        
        attendance.appendRow(user.getView());
    }
    
    // Hide loading
    $.loading.setOpacity(0.0);
    
};

request.onerror = function() {
    $.loading.setOpacity(0.0);
    Ti.API.error('読み込みに失敗しました><');
};

request.send(null);