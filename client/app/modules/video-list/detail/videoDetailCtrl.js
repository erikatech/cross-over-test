(function () {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:VideoDetailCtrl
	* @description
	* # VideoDetailCtrl
	* Controller of the detail page
	*/

	angular
		.module('videoList')
		.controller('VideoDetailCtrl', VideoDetailCtrl);

	VideoDetailCtrl.$inject = ['$rootScope', 'VideoDetailService', '$sce', '$state', 'CustomToastService', '$stateParams'];

	function VideoDetailCtrl($rootScope, VideoDetailService, $sce, $state, CustomToastService, $stateParams) {
		/*jshint validthis: true */
		var context = this;

		VideoDetailService.getVideoDetail($stateParams.videoId)
			.then(function (response) {
				context.video = response.data.data;
				// setting the video configuration needed by the videogular API
				context.video.config = {
					sources: [
						{src: $sce.trustAsResourceUrl(context.video.url), type: "video/mp4"}
					]
				};
			})
			.catch(function (error) {
				CustomToastService.show(error.message || error.data.error);
				_backToVideoList();
			});

		// the rating always starts at 0
		context.rating = 0;

		context.backToVideoList = _backToVideoList;
		context.submitEvaluation = _submitEvaluation;
		context.onPlayerReady = _onPlayerReady;
		context.onUpdateState = _onUpdateState;


		// $rootScope.$broadcast("tableDataUpdated", { state: page.$pristine });
		/**
		 * Returns to videoList page
		 * @private
		 */
		function _backToVideoList(){
			// I set the reload to true, so the selectedVideo is set to undefined
			// and I can have a better control of the elements being exhibited on the screen
			$state.go('videoList', {}, { reload: true });
		}

		/**
		 * Submits an evaluation to the server
		 * @private
		 */
		function _submitEvaluation(){
			var params = {
				videoId: context.video._id,
				rating: context.rating
			};
			VideoDetailService.rateVideo(params)
				.then(function () {
					context.response = {message: "Thank you for your evaluation", status: 'success'} ;
					context.rating = 0;
				})
				.catch(function (error) {
					// Shows a message, if something goes wrong
					CustomToastService.show(error.message);
					context.response = {message: "Error while submitting the evaluation", status: 'error'} ;
				})
		}

		/**
		 * Called when the video player is rendered
		 * @param API
		 * @private
		 */
		function _onPlayerReady(API){
			// we need this so we can pause the video, whe videoListCtrl started playing one
			// of its videos.
			context.videoAPI  = API;
		}

		/**
		 * Videogular method that is executed each time the user perform an action on the video
		 * @param $state
		 * @private
		 */
		function _onUpdateState($state){
			if($state === 'play'){
				// If the user play the selected video, we need to send this message so the
				// videoListCtrl can know when to stop the videos that are playing at this moment.
				$rootScope.$broadcast("videoDetailStartedPlaying");
			}
		}

		/**
		 * It hears the message sent by VideoListCtrl, that says one of its videos were started
		 */
		$rootScope.$on('videoListCtrlStartedPlaying', function () {
			context.videoAPI.pause();
		})
	}

})();
