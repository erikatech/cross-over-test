(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.service:authInterceptor
	 * @description
	 * # authInterceptor
	 * Service responsible for dealing with request and response authorization
	 */

  	angular
		.module('auth')
		.factory('AuthInterceptor', AuthInterceptor);

    	AuthInterceptor.$inject = ['$q', '$state'];

		function AuthInterceptor ($q, $state) {

            function responseError(responseError){
            	// It deals with the -1 HTTP Status Code
            	if(responseError.status === -1) {
            		return $q.reject({
						status: -1,
						message: 'Video Portal is out of reach'
					});
				}

            	// if the user isn't logged in, it redirects him/her to auth page.
            	if(responseError.status === 401) {
            		$state.go('auth');
            		location.href = "/";
            		return $q.reject({
						status: 401,
						message: 'You have to be logged in to see the videos'
					})
				}

                return $q.reject(responseError);
            }

			return {
                responseError: responseError
			};
		}
})();
