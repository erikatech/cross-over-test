(function () {
	'use strict';

	/**
	* @ngdoc function
	* @name app.service:VideoDetailService
	* @description
	* # VideoDetailService
	* Service of the videoList module
	*/

	angular.module('videoList')
		.factory('VideoDetailService', VideoDetailService);

	VideoDetailService.$inject = ['$http', 'SessionIdManager', '$q'];

	function VideoDetailService($http, SessionIdManager, $q) {

		return {
			getVideoDetail: _getVideoDetail,
			rateVideo: _rateVideo
		};

		/**
		 * Returns the video detail call to service
		 * @param videoId
		 * @returns {}
		 * @private
		 */
		function _getVideoDetail(videoId){
			if(!videoId){
				return $q.reject({
					message: 'Invalid request arguments'
				});
			}
			return $http({
				url: '/video',
				method: "GET",
				params: {
					sessionId: SessionIdManager.getSessionId(),
					videoId: videoId
				}
			});
		}

		/**
		 * Rates a video
		 * @param params
		 * @private
		 */
		function _rateVideo(params){
			if(!params || !params.videoId || !params.rating){
				return $q.reject({
					message: 'Invalid request arguments'
				});
			}
			var sessionId = SessionIdManager.getSessionId();
			var requestData = { videoId: params.videoId, rating: params.rating };
			return $http.post('/video/ratings?sessionId='.concat(sessionId), requestData);
		}
	}

})();
