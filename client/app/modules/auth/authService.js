(function () {
	'use strict';

	/**
	* @ngdoc function
	* @name app.service:authService
	* @description
	* # authService
	* Service for the auth module
	*/

	angular.module('auth')
		.factory('AuthService', AuthService);

	AuthService.$inject = ['$http', '$q', '$state', 'SessionIdManager'];

	function AuthService($http, $q, $state, SessionIdManager) {

		return {
			authenticate: _authenticate,
			logout: _logout
		};

		/**
		 * Authenticates a user
		 * @param user to be authenticated {username, password}
		 * @private
		 */
		function _authenticate(user) {
			if(!user || !user.username || !user.password){
				return $q.reject({
					message: 'Invalid request arguments'
				});
			}
			return $http.post('/user/auth', {
				username: user.username,
				password: user.password
			}).then(function (response) {
				if(!response.data && !response.data.sessionId){
					return $q.reject({
						status: 'error',
						message: 'Session ID is not present in response'
					});
				}
				return $q.resolve(response);
			});
		}

		/**
		 * Logs out the user
		 * @private
		 */
		function _logout(sessionId){
			if(sessionId && (typeof sessionId !== "string")){
				return $q.reject({
					message: "Couldn't logout the current user"
				});
			}

			if(!sessionId || sessionId.trim() === ""){
				return $q.reject({
					message: 'You must pass the sessionId'
				});
			}

			return $http({
				url: '/user/logout',
				method: 'GET',
				params: {
					sessionId: sessionId
				}
			}).then(function (response) {
				if(response.status === 401){
					return $q.reject({
						message: 'Invalid sessionId'
					});
				}
				// Before returning, we remove the user from session
				SessionIdManager.removeSessionId();

				$state.go('auth');
			});
		}
	}

})();
