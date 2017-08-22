// Grunt tasks

module.exports = function (grunt) {
	"use strict";

	// Project configuration.
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),
		banner: '/*!\n' +
		'* <%= pkg.name %> - v<%= pkg.version %> - MIT LICENSE <%= grunt.template.today("yyyy-mm-dd") %>. \n' +
		'* @author <%= pkg.author %>\n' +
		'*/\n',

		clean: {
			// dist: ['dist'],
			dist: ['app/assets/dist/css/video-portal.min.css', 'app/assets/dist/js/video-portal.min.js'],
			tmp: ['tmp'],
			dependencies: ['src/bower_components']
		},

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			gruntfile: {
				src: 'Gruntfile.js'
			},
			app: {
				src: ['app/modules/**/*.js']
			}
		},

		exec: {
			bowerInstaller: 'npm install'
		},

		concat: {
			options: {
				banner: '<%= banner %>',
				stripBanners: false
			},
			base: {
				src: [
					'src/bower_components/angular/angular.js',
					'src/bower_components/angular-animate/angular-animate.min.js',
					'src/bower_components/angular-aria/angular-aria.min.js',
					'src/bower_components/angular-cookies/angular-cookies.min.js',
					'src/bower_components/angular-material/angular-material.min.js',
					'src/bower_components/angular-messages/angular-messages.min.js',
					'src/bower_components/angular-resource/angular-resource.min.js',
					'src/bower_components/angular-ui-router/release/angular-ui-router.min.js',
					'src/bower_components/angular-material-icons/angular-material-icons.min.js',
					'src/bower_components/angular-sanitize/angular-sanitize.min.js',
					'src/bower_components/angular-md5/angular-md5.min.js',
					'src/bower_components/videogular/videogular.min.js',
					'src/bower_components/videogular-controls/vg-controls.min.js',
					'app/libraries/js/scrollToEnd.js',
					'app/video-portal-app.js',
					'app/video-portal-config.js',
					'app/modules/**/*Module.js',
					'app/modules/**/*Route.js',
					'app/modules/**/*Ctrl.js',
					'app/modules/**/*Service.js',
					'app/modules/**/*Directive.js',
					'app/modules/**/*Interceptor.js'
				],
				dest: 'tmp/<%= pkg.name %>-appbundle.js'
			}
		},

		uglify: {
			options: {
				banner: '<%= banner %>',
				report: 'min'
			},
			base: {
				src: ['<%= concat.base.dest %>'],
				dest: 'app/assets/dist/js/<%= pkg.name %>.min.js'
			}
		},

		injector: {
			options: {
				addRootSlash: false
			},
			dev: {
				files: {
					'index.html': [
						'app/video-portal-app.js',
						'app/video-portal-config.js',
						'app/**/*Module.js',
						'app/**/*Route.js',
						'app/**/*Ctrl.js',
						'app/**/*Service.js',
						'app/**/*Directive.js',
						'app/**/*Interceptor.js',
						'app/libraries/**/*',
						'app/assets/**/*.css'
					]
				}
			},
			production: {
				files: {
					'index.html': [
						'app/assets/dist/css/*.css',
						'app/assets/dist/js/*.js'
					]

				}
			}
		},

		ngtemplates: {
			app: {
				src: 'app/modules/**/*.html',
				dest: 'tmp/templates.js',
				options: {
					module: '<%= pkg.name %>',
					standAlone: false
				}
			}
		},

		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1,
				noRebase: true,
				rebase: false
			},
			target: {
				files: {
					'app/assets/dist/css/<%= pkg.name %>.min.css':
						['app/assets/css/video-portal.css', 'src/bower_components/angular-material-icons/angular-material-icons.css',
							'src/bower_components/angular-material/angular-material.min.css',
							'src/bower_components/videogular-themes-default/videogular.min.css',
							'src/bower_components/components-font-awesome/css/font-awesome.min.css'
						]
				}
			}
		},

		sass: {
			dist: {
				files: {
					'app/assets/css/video-portal.css': 'app/assets/sass/video-portal.scss'
				}
			}
		}



	});

	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt);

	// Making grunt default to force in order not to break the project if something fail.
	grunt.option('force', true);

	// Register grunt tasks
	grunt.registerTask("build", [
		"clean",
		"exec",
		"ngtemplates",
		"concat",
		"sass",
		"cssmin",
		"uglify",
		"injector:production",
		"clean:tmp"
	]);

	// Development task(s).
	grunt.registerTask('dev', ['sass', 'injector:dev']);

};
