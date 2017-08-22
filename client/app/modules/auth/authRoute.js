'use strict';

	/**
	* @ngdoc function
	* @name app.route:authRoute
	* @description
	* # authRoute
	* Route of the auth module
	*/

angular.module('auth')
	.config(['$stateProvider', function ($stateProvider) {
		$stateProvider
			.state('auth', {
				url: '/',
				templateUrl: 'app/modules/auth/auth.html',
				controller: 'AuthCtrl',
				controllerAs: '$authCtrl'
			});

	}]);
