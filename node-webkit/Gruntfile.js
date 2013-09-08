module.exports = function(grunt) {

  grunt.initConfig({
    
    // Concat files task
    concat: {
      target: {
        src: ['js/src/head.js', 'js/src/lazy.js', 'js/src/db.js', 'js/src/request.js', 'js/src/application.js'],
        dest : 'js/app.js'
      }
    },
    
    // Minify scripts 
    uglify: {
      my_target: {
        files: {
          'js/app.min.js' : ['js/app.js']
        }
      }
    },
    
    // Monify css
    cssmin: {
      compress: {
        files: {
          "css/index.min.css": ['css/index.css']
        }
      }
    },
    
    // node-webkit
    nw: {
      nw_path: '/home/sugimoto/local/node-webkit',
      executable: true,
      sources: ['assets', 'css', 'js', 'node_modules', 'index.html', 'package.json'],
      dest: 'build/app.nw'
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadTasks('tasks');
  
  grunt.registerTask('default', ['concat', 'uglify', 'cssmin', 'nw']);
};
