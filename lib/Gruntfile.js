module.exports = function(grunt) {

  grunt.initConfig({
    browserify: {
      js: {
          src: ['../js/**/*.js'],
          dest: '../dist/app.js'
      },
      options: {
          transform: ['hbsfy'],
          browserifyOptions: {
            paths: ["./node_modules"]
          }
      }
    },
    jshint: {
      options: {
        predef: [ "document", "console" ],
        esnext: true,
        globalstrict: true,
        globals: {$:true, Weather:true},
        browserify: true,
        reporter: require('jshint-stylish')
      },
      files: ['../js/**/*.js']
    },
    sass: {
      dist: {
        files: {
          '../css/styles.css': '../sass/styles.scss'
        }
      }
    },
    connect: {
      server: {
        options: {
          base: '../',
          hostname: 'localhost',
          port: 3000,
          livereload: true,
          open: true
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      index: {
        files: ['../index.html']
      },
      js: {
        files: ['../js/**/*.js'],
        tasks: ['jshint', 'browserify']
      },
      sass: {
        files: ['../sass/**/*.scss'],
        tasks: ['sass']
      },
      hbs: {
        files: ['../templates/**/*.hbs'],
        tasks: ['browserify']
      },
      browserify: {
        files: ['../js/*.js'],
        tasks: ['browserify']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['jshint', 'sass', 'browserify', 'connect','watch']);
};
