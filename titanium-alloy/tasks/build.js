var child = require('child_process');

module.exports = function(grunt) {
    
    grunt.registerTask('build', 'Build titanium applition to genymotion device', function() {
  
        var config = grunt.config('build'),
            server = config.device_server,
            target = config.device_target,
            done   = this.async(),
            cmd    = 'titanium build -p ' + target + ' --build-only && adb -s ' + server + ' install -r build/' + target + '/bin/app.apk',
            proc;
    
        proc = child.exec(cmd, function(err, stdout, stderr) {
            if ( err ) {
                return grunt.log.errolns('Build failed!');
            } else if ( stderr ) {
                return grunt.log.errorlns(stderr);
            }

            grunt.log.oklns('OK build success.');
            done();
        });
        
        proc.stdout.on('data', onData);
        
        function onData(data) {
            if ( /^Success\s+$/.test(data) ) {
                proc.stdout.removeListener('data', onData);
                done();
            }
            grunt.log.write(data);
        }
  });
};
