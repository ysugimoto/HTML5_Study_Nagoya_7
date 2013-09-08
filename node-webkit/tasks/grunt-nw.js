var grunt = require('grunt');

grunt.registerTask('nw', 'build node-webkit application', function() {
    var child = require('child_process');
    
    var config  = grunt.config('nw'),
        cmd     = config.nw_path,
        exec    = config.executable,
        sources = config.sources,
        dest    = config.dest,
        done    = this.async();
    
    // copy nw.pak
    sources.unshift(dest);
    
    // execute build
    child.exec('zip -r ' + sources.join(' '), function(err, stdout, stderr) {
        var dir = "";
        
        if ( err ) {
            return grunt.log.errorlns(err);
        } else if ( stderr ) {
            return grunt.log.errorlns(stderr);
        }
        
        grunt.log.writeln(dest + ' application build success.');
        
        if ( exec ) {
            if ( dest.indexOf('/') !== -1 ) {
                dir = dest.split('/');
                dir.pop();
                dir = dir.join('/') + '/';
            }
            grunt.file.copy(cmd + '/nw.pak', dir + 'nw.pak');
            child.exec('cat ' + cmd + '/nw ' + dest + ' > ' + dir + 'app && chmod +x ' + dir + 'app', function(err, stdout, stderr) {
                if ( err ) {
                    return grunt.log.errorlns(err);
                } else if ( stderr ) {
                    return grunt.log.errorlns(stderr);
                }
                grunt.log.oklns('App build success');
                done();
            });
        } else {
            done();
        }
    });
});
