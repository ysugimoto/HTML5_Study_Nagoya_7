(function(module) {
    
    var DB = openDatabase('zusaar', '1.0', 'zusaar attendance db', 2 * 1024 * 1024);
    
    DB.transaction(function(trans) {
       trans.executeSql('CREATE TABLE IF NOT EXISTS attendance ( id integer primary key, userid integer, name test, is_attended integer )');
    });
    
    function Database() {}
    
    Database.query = function(sql, _bind) {
        var lazy = new module.Lazy(),
            bind = _bind || [];
        
        DB.transaction(function(trans) {
            trans.executeSql(sql, bind, function(trans, result) {
                if ( result ) {
                    lazy.signal.success(Array.prototype.slice.call(result));
                } else {
                    lazy.signal.failed();
                }
            });
        });
        
        return lazy;
    };
    
    module.DB = Database;
    
})(typeof Module !== 'undefined' ? Module : this);
