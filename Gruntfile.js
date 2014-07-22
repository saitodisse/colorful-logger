/*
 * A) Simple Watch Events
 */
module.exports = function(grunt) {
  grunt.initConfig({
    copy: {
      main: {
        files: [
          {
            src: ['bower_components/requirejs/require.js'],
            dest: 'javascripts/vendor/require.js'
          },
          {
            src: ['bower_components/lodash/dist/lodash.js'],
            dest: 'javascripts/vendor/lodash.js'
          },
          {
            src: ['bower_components/colorful-logger/src/colorful-logger.js'],
            dest: 'javascripts/vendor/colorful-logger.js'
          },
          {
            src: ['bower_components/colorful-logger/src/html-console.js'],
            dest: 'javascripts/vendor/html-console.js'
          },
          {
            src: ['bower_components/jquery/dist/jquery.js'],
            dest: 'javascripts/vendor/jquery.js'
          },
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['copy']);

};