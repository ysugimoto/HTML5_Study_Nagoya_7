var gui  = require('nw.gui');

onload = function() {
    var win = gui.Window.get();
    
    win.maximize();
    win.show();
};

function App(parameter) {
    this.caption    = document.getElementById('event-caption');
    this.list       = document.getElementById('list-table');
    this.event      = parameter.eventData;
    this.attendance = parameter.attendance;
    
    this.startup();
}
App.EventID = '984003';

App.init = function() {
    var layer  = document.getElementById('layer'),
        params = { attendance: {}, eventData: null };
        
    Module.DB.query('SELECT * FROM attendance ORDER BY id ASC', [])
    .success(function(result) {
        var size  = result.length,
            i     = 0;
            
        for ( ; i < size ; ++i ) {
            params.attendance[result.user_id] = result;
        }
    })
    .then(function() {
        return Module.http({
                  hostname : "www.zusaar.com",
                  port: 80,
                  method: "GET",
                  path: "/api/event/user/?event_id=" + App.EventID
              });
    })
    .success(function(response) {
        var json = JSON.parse(response);
        
        params.eventData = json.event[0];
        layer.style.display = 'none';
        new App(params);
    })
    .failed(function() {
        layer.style.display = 'none';
        
    });
};

App.prototype.startup = function() {
    this.createCaption(this.event);
    this.createListView(this.event.users);
};

App.prototype.createCaption = function(event) {
    var html = [
        '<span class="title">' + event.title + '<span>',
        '<em class="accept">' + event.accepted + '</em>',
        '/',
        '<em class="limit">' + event.limit + '</em>',
        '(補欠&nbsp;' + event.waiting + '人)'
    ];
    
    this.caption.innerHTML = html.join('');
};

App.prototype.createListView = function(users) {
    var ul = document.createElement('ul'),
        i  = -1,
        user,
        li,
        isAttended;
    
    while ( users[++i] ) {
        user       = users[i];
        isAttended = user.user_id in this.attendance && this.attendance[user.user_id].is_attended > 0;
        li         = document.createElement('li');
        
        li.setAttribute('data-userid', user.user_id);
        li.setAttribute('class', 'status' + user.status);
        li.setAttribute('data-attendance', ( isAttended ) ? 'on' : 'off');
        li.innerHTML = '<div>' + user.nickname + '<span>' + (( user.status > 0 ) ? '' : '（補欠）') + '</span></div>';
        
        ul.appendChild(li);
    }
    
    this.list.appendChild(ul);
    
}

