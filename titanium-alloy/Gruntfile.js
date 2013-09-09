module.exports = function(grunt) {

  grunt.initConfig({
    
    // auto build and install for genymotion-android device
    build: {
        device_server: '192.168.56.101:5555',
        device_target: 'android'
    }
  });
  
  grunt.loadTasks('tasks');
  
  grunt.registerTask('default', ['build']);
};
