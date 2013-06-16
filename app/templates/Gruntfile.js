/*global module:false*/
module.exports = function(grunt) {

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    // Task configuration.
      dist: {
        src: ['src/<%= projectName %>.js'],
        dest: 'dist/<%= projectName %>.js'
      }
    },
    uglify: {
      options: {
      },
      dist: {
        src: 'src/<%= projectName %>.js',
        dest: 'dist/<%= projectName %>.min.js'
      }
    },
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
      },<% if (useLess) { %>
      less: {
        development: {
          options: {
            paths: ["assets/css"]
          },
          files: {
            "path/to/result.css": "path/to/source.less"
          }
        },
        production: {
          options: {
            paths: ["assets/css"],
            yuicompress: true
          },
          files: {
            "path/to/result.css": "path/to/source.less"
          }
        }
      },<% } %>
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['js/**/*.js']
      }
    },
    jasmine: {
      pivotal: {
        src: 'js/axn.js',
        options: {
          specs: 'test/spec/axnSpec.js'
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  // grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('<%= testFw.name %>');
  grunt.loadNpmTasks('grunt-contrib-jshint');<% if (useLess) { %>
  grunt.loadNpmTasks('grunt-contrib-less');<% } %>

  // Default task.
  grunt.registerTask('default', ['jshint', 'jasmine', 'uglify']);
  grunt.registerTask('scrub', ['jshint', 'jasmine']);

};