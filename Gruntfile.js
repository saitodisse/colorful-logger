/*
 * A) Simple Watch Events
 */
module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: ['Gruntfile.js', '*.js', 'tests/{,*/}*.js']
    },    

    watch: {
      jshint:{
        files: ['Gruntfile.js', 'src/*.js', 'tests/*.js'],
        tasks: ['jshint']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint']);
  grunt.option('force', true);

  grunt.registerTask('test', [
    'jshint',
    'watch'
  ]);

};