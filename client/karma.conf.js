// Karma configuration
// Generated on Sun Aug 20 2017 12:18:30 GMT-0500 (-05)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

	  /*''ngResource',
		'ngAria',
	 	'ngMaterial',
		'ngMdIcons',
		'ngMessages',
		'ngCookies',
		'ngAnimate',
		'ngSanitize',
		'ui.router',
		'ngRateIt',
		'scrollToEnd',
		'auth',
		'videoList'*/


    // list of files / patterns to load in the browser
    files: [
		'src/bower_components/angular/angular.js',
		'src/bower_components/angular-animate/angular-animate.js',
		'src/bower_components/angular-resource/angular-resource.min.js',
		'src/bower_components/angular-aria/angular-aria.js',
		'src/bower_components/angular-material/angular-material.js',
		'src/bower_components/angular-material-icons/angular-material-icons.js',
		'src/bower_components/angular-messages/angular-messages.min.js',
		'src/bower_components/angular-cookies/angular-cookies.js',
		'src/bower_components/angular-sanitize/angular-sanitize.js',
		'src/bower_components/angular-ui-router/release/angular-ui-router.js',
		'src/bower_components/angular-rateit/src/ng-rateit.js',
		'app/libraries/js/scrollToEnd.js',
		'src/bower_components/angular-mocks/angular-mocks.js',
		'src/bower_components/videogular/videogular.js',
		'src/bower_components/videogular-controls/vg-controls.js',
		'src/bower_components/angular-md5/angular-md5.js',
		'app/video-portal-app.js',
		'app/modules/shared/SessionIdManagerService.js',
		'app/modules/shared/CustomToastService.js',
		'app/modules/auth/authModule.js',
		'app/modules/video-list/videoListModule.js',
		'app/modules/auth/authService.js',
		'app/modules/auth/authCtrl.js',
		'app/modules/auth/auth.service.spec.js',
		'app/modules/auth/auth.controller.spec.js',
		'app/modules/video-list/videoListModule.js',
		'app/modules/video-list/videoListService.js',
		'app/modules/video-list/videoListCtrl.js',
		'app/modules/video-list/videoList.service.spec.js',
		'app/modules/video-list/videoList.controller.spec.js',
		'app/modules/video-list/detail/videoDetailCtrl.js',
		'app/modules/video-list/detail/videoDetailService.js',
		'app/modules/video-list/detail/videoDetail.service.spec.js',
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
	preprocessors: {
	  // source files, that you wanna generate coverage for
	  // do not include tests or libraries
	  // (these files will be instrumented by Istanbul)
	  'app/modules/**/*.js': ['coverage']
  	},

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
  	// coverage reporter generates the coverage
	reporters: ['progress', 'coverage'],

	// optionally, configure the reporter
	coverageReporter: {
	  type : 'html',
	  dir : 'coverage/'
	},

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  })
};
