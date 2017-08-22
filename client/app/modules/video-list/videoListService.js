(function () {
	'use strict';

	/**
	* @ngdoc function
	* @name app.service:videoListService
	* @description
	* # videoListService
	* Service of the videoList module
	*/

	angular.module('videoList')
		.factory('VideoListService', VideoListService);

	VideoListService.$inject = ['$http', '$q'];

	function VideoListService($http, $q) {

		return {
			getVideoList: _getVideoList
		};

		/**
		 * fetch the video list according to the position passed
		 * @param requestData sessionId, skip
		 * @private
		 */
		function _getVideoList(requestData){
			if(!requestData || !requestData.skip){
				return $q.reject({
					message: 'Invalid request arguments'
				});
			}
			return $http({
				url: '/videos',
				method: "GET",
				params: {
					sessionId: requestData.sessionId,
					skip: requestData.skip,
					limit: 10 //will always get 10 videos
				}
			})
		}
	}

})();
