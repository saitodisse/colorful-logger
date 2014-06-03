/*
 * A) Simple Watch Events
 */
module.exports = function(grunt) {
  grunt.initConfig({
    copy: {
      main: {
        files: [
          // requirejs
          {src: ['bower_components/requirejs/require.js'], dest: 'javascripts/require.js'},
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['copy']);

};