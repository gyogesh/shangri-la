module.exports = function(grunt) {

	grunt.initConfig({

    // Linting css files
		csslint:{
			options:{
				"important":false,
				"regex-selectors":false,
				"unique-headings":false,
				"universal-selector":false,
				"unqualified-attributes":false,
				"box-sizing":false,
				"outline-none":false,
				"compatible-vendor-prefixes":false,
				"adjoining-classes":false,
				"qualified-headings":false,
				"vendor-prefix":false,
				"box-model":false,
				"ids":false,
				"fallback-colors":false,
				"display-property-grouping":false,
				"font-sizes":false,
				"known-properties":false,
				"overqualified-elements":false,
        "star-property-hack":false
			},
			src:['source/css/*.css']
		},

    // Compiles Sass into corresponding css
    sass: {
      dist: {
        noCache: true,
        files: [
          {
            expand: true,
            cwd: 'source/scss/',
            src: ['*.scss'],
            dest: 'source/css/',
            ext: '.css'
          }
        ]
      }
    },

    // Linting JS common and module files
		jshint:{
			src:['source/js/*.js', 'source/js/modules/*.js']
		},

    // Compressing and adding HTML files to build
		useminPrepare:{
			html: {
				src:['source/*.html']
			},
			options: {
				dest:'build/'
			}
		},

    // concatinate css files
    // concat_css: {
    //   options: {

    //   },
    //   all: {
    //     src: ['source/css/vendors/*.css'],
    //     dest: 'source/css/vendors.css'
    //   }
    // },

    // Compressing and adding CSS files to build
		cssmin:{
			combine:{
  			files: {
          'build/css/vendors.css':['source/css/vendors/*.css'],
          'build/css/base.css':'source/css/base.css',
          'build/css/modules.css':'source/css/modules.css'
  			}
			}
		},

    // Concatinating, compressing and adding JS files to build
		uglify:{
			build:{
				files:{
					'build/js/common.js':'source/js/common.js',
          'build/js/modules.js':['source/js/modules/*.js'],
					'build/js/vendors.js':['source/js/vendors/*.js', '!source/js/vendors/modernizr-2.8.2.min.js'],
          'build/js/modernizr-2.8.2.min.js': 'source/js/vendors/modernizr-2.8.2.min.js'
				}
			}
		},

    // Minifying html?
		usemin:{
			html:['build/*.html']
		},

    // Copying htmls, images, fonts and other files to build
		copy:{
			html:{
				expand:true,
				cwd:'source/',
				src:['*.html'],
				dest:'build/',
        ext:'.html'
			},

			images:{
				expand:true,
				cwd:'source/img/',
				src:'**',
        dest:'build/img/'
			},

			fonts:{
				expand:true,
				cwd:'source/font/',
				src:'**',
        dest:'build/font/'
			},

			modernizr: {
				expand:true,
				cwd:'source/js/vendors/',
				src:'modernizr-2.8.2.min.js',
        dest:'build/js/'
			}
		},

    // Compiling jade templates to htmls
		jade: {
      compile: {
        options:{
          client:false,
          pretty:true
        },
        files: [{
          expand:true,
          cwd:'source/pages/',
          src:['*.jade'],
          dest:'source/',
          ext:'.html'
        }]
      }
		},

    // Prettifying and formatting html
    prettify: {
      options: {
        "indent": 2,
        "indent_char": " ",
        "indent_scripts": "normal",
        "wrap_line_length": 0,
        "brace_style": "collapse",
        "preserve_newlines": true,
        "max_preserve_newlines": 1,
        dest:'source/'
      },
      all: {
        expand: true,
        cwd: 'source/',
        ext: '.html',
        src: ['*.html'],
        dest: 'source/'
      }
    },

    // Watching file changes to jade, scss and js files
    watch: {
      jade: {
          files:['source/pages/*.jade','source/modules/*.*', 'source/components/*.*', 'source/templates/*.*'],
          tasks:['htmlize']
      },
      scss: {
        files:['source/scss/*.scss'],
        tasks:['sass', 'csslint']
      },
      scripts: {
        files:['source/js/*.js', 'source/js/modules/*.js'],
        tasks:['jshint']
      }
    }

	});

  // Loading package tasks to be used.
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-prettify');
  //grunt.loadNpmTasks('grunt-concat-css');

  // Registering task for use

  // grunt htmlize - compiling jade templates to html pages with proper formatting applied
  grunt.registerTask('htmlize',['jade', 'prettify']);

  // grunt watcher - Watches for file changes to jade, scss and js files and performs sass/csslint, jshint or htmlize accordingly.
  // Can be kept running in separate CMD.
  grunt.registerTask('watcher',['watch']);

  // grunt (default) - Converts scss file to css files and lints + lints js files
	grunt.registerTask('default',['sass','csslint','jshint']);

  // grunt build - Does all the tasks and builds project code to be delivered in separate 'build' folder
	grunt.registerTask('build',['sass','csslint','jshint','cssmin','useminPrepare','usemin','uglify','copy']);
};