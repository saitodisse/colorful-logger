/*
 * A) Simple Watch Events
 */
module.exports = function(grunt) {
  grunt.initConfig({
    nodeunit: {
      files: ['tests/**/*.js'],
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: ['Gruntfile.js', '*.js', 'tests/{,*/}*.js']
    },    

    watch: {
      jshint:{
        files: ['Gruntfile.js', '*.js', 'tests/{,*/}*.js'],
        tasks: ['jshint']
      },
      nodeunit:{
        files: ['tests/**/*.js'],
        tasks: ['nodeunit']
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['nodeunit', 'jshint']);

  grunt.registerTask('test', [
    'jshint',
    'nodeunit',
    'watch'
  ]);

};