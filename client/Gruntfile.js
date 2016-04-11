/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    distdir:'dist',
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> -  \n */',
    src:{
      js: ['src/**/*.js'],
      html: ['src/index.html']
    },
    clean: ['<%= distdir %>/*'],
    // Task configuration.
    karma:{
      unit: {
        configFile: 'test/karma.conf.js'

      }
    },
    concat: {

      dist: {
        options: {
          banner: '<%= banner %>'
        },
        src: ['<%= src.js %>'],
        dest: '<%=distdir %>/<%= pkg.name %>.js'
      },
      index: {
        src: ['src/index.html'],
        dest: '<%= distdir %>/index.html',
        options: {
          process: true
        }
      },
      angular: {
        src:['bower_components/angular/angular.js', 'bower_components/angular-route/angular-route.js','bower_components/angular-resource/angular-resource.js'],
        dest: '<%= distdir %>/angular.js'
      },
      jquery: {
        src:['bower_components/jquery/dist/jquery.js'],
        dest: '<%= distdir %>/jquery.js'
      }
    },
    uglify: {
      dist: {

        src: ['<%= src.js %>'],
        dest: '<%=distdir %>/<%= pkg.name %>.js'
      },

      angular: {
        src:['bower_components/angular/angular.js', 'bower_components/angular-route/angular-route.js','bower_components/angular-resource/angular-resource.js'],
        dest: '<%= distdir %>/angular.js'
      },
      jquery: {
        src:['bower_components/jquery/dist/jquery.js'],
        dest: '<%= distdir %>/jquery.js'
      }
    },
    jshint: {
      files:['gruntFile.js', '<%= src.js %>'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        boss: true,
        eqnull: true,
        globals: {

        }
      }
    },

    watch: {
      all: {
        files: ['<%= src.js %>','<%= src.html %>'],
        tasks: ['concat','uglify']
      },
      build: {
        files: ['<%= src.js %>','<%= src.html %>'],
        tasks: ['concat','uglify']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  // Default task.
  grunt.registerTask('default', ['clean','jshint','concat', 'uglify']);
  grunt.registerTask('build',['clean','jshint','concat','karma']);
  grunt.registerTask('release', ['clean','jshint','concat', 'uglify','karma']);
};
