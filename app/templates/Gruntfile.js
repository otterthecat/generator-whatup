/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    // Task configuration.
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['js/**/*.js']
      }
    },
    jasmine: {
      pivotal: {
        src: 'js/<%= projectName %>.js',
        options: {
          specs: 'test/spec/<%= projectName %>Spec.js'
        }
      }
    },<% if (useLess) { %>
    less: {
      development: {
        options: {
          paths: ["less"]
        },
        files: {
          "app/css/main.css": "less/main.less"
        }
      },
      production: {
        options: {
          paths: ["less"],
          yuicompress: true
        },
        files: {
          "app/css/main.css": "less/main.less"
        }
      }
    }<% } %>
  });

  // These plugins provide necessary tasks.
  // grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('<%= testFw.name %>');
  grunt.loadNpmTasks('grunt-contrib-jshint');<% if (useLess) { %>
  grunt.loadNpmTasks('grunt-contrib-less');<% } %>

  // Default task.
  grunt.registerTask('default', ['jshint', '<%= testFw.shortName %>', 'less']);
  grunt.registerTask('scrub', ['jshint', '<%= testFw.shortName %>']);
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('less', ['less']);
};