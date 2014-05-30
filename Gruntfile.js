/*
 * A) Simple Watch Events
 */
module.exports = function(grunt) {
  grunt.initConfig({
    nodeunit: {
      options:{
        reporter: 'default'//'minimal'
      },
      files: ['tests/*.test.js'],
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
        files: ['Gruntfile.js', 'src/*.js', 'tests/*.js'],
        tasks: ['jshint']
      },
      nodeunit:{
        files: ['src/*.js', 'tests/*.test.js'],
        tasks: ['nodeunit']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['nodeunit', 'jshint']);
  grunt.option('force', true);

  grunt.registerTask('test', [
    'jshint',
    'nodeunit',
    'watch'
  ]);

};