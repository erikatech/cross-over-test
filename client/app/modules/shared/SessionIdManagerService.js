(function () {
	'use strict';

	/**
	* @ngdoc function
	* @name app.service:SessionIdManager
	* @description
	* # SessionIdManager
	* Service create for dealing with the sessionId sessionStorage value
	*/

	angular.module('video-portal')
		.service('SessionIdManager', SessionIdManager);

	function SessionIdManager() {

		/**
		 * sets a new session id when user is logging in
		 * @param sessionId
		 * @private
		 */
		this.setSessionId = function(sessionId) {
			sessionStorage.setItem("sessionId", sessionId);
		};

		/**
		 * Returns the session id storage at sessionStorage
		 * This is needed when we have to fetch videos data.
		 * @private
		 */
		this.getSessionId = function(){
			return sessionStorage.getItem("sessionId");
		};

		/**
		 * Remove the sessionId from sessionStorage when user logs out
		 * @private
		 */
		this.removeSessionId = function(){
			sessionStorage.removeItem("sessionId");
		}
	}
})();
