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
      html: ['index.html'],
      less: ['src/resource/stylesheet.less'],
      uibootstrap:['bower_component/angular-bootstrap/**/*.js']
    },
    clean: ['<%= distdir %>/*'],
    // Task configuration.
    karma:{
      unit: {
        configFile: 'test/karma.conf.js'

      }
    },
    less: {
      build: {

        files: {
          '<%= distdir %>/<%= pkg.name %>.css': '<%= src.less %>'
        }
      },
      release: {
        files: {
          '<%= distdir %>/<%= pkg.name %>.css': ['<%= src.less %>']
        },
        options: {
          plugins: [
            new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]}),
            new (require('less-plugin-clean-css'))({advanced: true})
          ]
        }
      }

    },
    html2js: {

      main: {
        src: ['src/**/*.tpl.html'],
        dest: '<%= distdir %>/templates.js'
      },
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
        src: ['index.html'],
        dest: '<%= distdir %>/index.html',
        options: {
          process: true
        }
      },
      bootstrap:{
        src:['bower_components/angular-bootstrap/ui-bootstrap.js','bower_components/angular-bootstrap/ui-bootstrap-tpls.js'],
        dest:'<%= distdir %>/ui-bootstrap.js'
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
      },
      bootstrap:{
        src:['bower_components/angular-bootstrap/ui-bootstrap.js','bower_components/angular-bootstrap/ui-bootstrap-tpls.js'],
        dest:'<%= distdir %>/ui-bootstrap.js'
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
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-contrib-less');

  // Default task.
  grunt.registerTask('default', ['clean','jshint','concat', 'uglify']);
  grunt.registerTask('build',['clean','jshint','concat','html2js']);
  grunt.registerTask('release', ['clean','jshint','concat', 'uglify','html2js','less:release']);
};
