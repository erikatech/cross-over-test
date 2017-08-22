(function () {
	'use strict';

	/**
	 * @ngdoc configuration file
	 * @name video-portal-config:config
	 * @description
	 * # Config and run block
	 * Configuration of the videoPortalApp
	 */


	angular
		.module('video-portal')
		.config(configure);
	configure.$inject = ['$urlRouterProvider', '$locationProvider', '$httpProvider'];

	function configure($urlRouterProvider, $locationProvider, $httpProvider) {

		$locationProvider.hashPrefix('!');

		$httpProvider.interceptors.push('AuthInterceptor');

		// This is required for Browser Sync to work poperly
		$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

		$urlRouterProvider.otherwise('/');
	}
})();
