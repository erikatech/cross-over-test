(function () {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:AuthCtrl
	* @description
	* # AuthCtrl
	* Controller for the auth.html page
	*/

	angular
		.module('video-portal')
		.controller('AuthCtrl', Auth);

	Auth.$inject = ['AuthService', '$state', 'SessionIdManager', "CustomToastService", 'md5'];

	function Auth(AuthService, $state, SessionIdManager, CustomToastService, md5) {
		/*jshint validthis: true */
		var context = this;

		context.authenticate = _authenticate;
		context.encryptPassword = _encryptPassword;

		/**
		 * Method used to authenticate an user
		 * @private
		 */
		function _authenticate(){
			// if the user is undefined, leave
			if(!context.user) return;

			// Makes a copy a the user in the context, so in the case the user miss username or password,
			// it doesn't get modified by the encrypt password method
			var userCopy = angular.copy(context.user);

			//do the encrypting
			userCopy.password = _encryptPassword(userCopy);

			//send the user with the encrypted password
			AuthService.authenticate(userCopy)
				.then(function (response) {

					// the response returns the HTTP Code 200, even if the credentials are wrong,
					// so I have the deal with the status description, so we show the message to user when he/r
					// misses the username or password
					if(response.data.status === 'error'){
						CustomToastService.show(response.data.error);
						return;
					}
					// if all goes ok, we set the sessionId variable in sessionStorage.
					SessionIdManager.setSessionId(response.data.sessionId);

					//direct user to video-list
					$state.go('videoList');
				})
				.catch(function (error) {
					// shows a message if the system is out of reach
					CustomToastService.show(error.message);
				});
		}

		/**
		 * Method that encrypts a password
		 * @param user the saves the password to be encrypted
		 * @returns {string} the encrypted password
		 * @private
		 */
		function _encryptPassword(user){
			try {
				return md5.createHash(user.password);
			} catch(err){
				throw new TypeError("Password must be defined");
			}
		}
	}
})();
