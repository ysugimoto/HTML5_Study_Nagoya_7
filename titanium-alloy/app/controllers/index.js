$.index.addEventListener('open', function(evt) {
    Alloy.Globals.currentTab = evt.activeTab;
});

$.index.addEventListener('focus', function(evt) {
    Alloy.Globals.currentTab = evt.tab;
});

// GC for memory leak
$.index.addEventListener('close', function() {
    $.destroy();
});

$.index.open();