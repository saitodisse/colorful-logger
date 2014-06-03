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
            dest: 'javascripts/colorful-logger.js'
          },
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['copy']);

};