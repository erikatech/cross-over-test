(function () {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:videoListCtrl
	* @description
	* # videoListCtrl
	* Controller of the videoList module
	*/

	angular
		.module('videoList')
		.controller('VideoListCtrl', VideoList);

	VideoList.$inject = ['$rootScope','VideoListService', '$sce', '$state', '$timeout', '$anchorScroll', '$location',
		'SessionIdManager', 'CustomToastService', 'AuthService'];

	function VideoList($rootScope, VideoListService, $sce, $state, $timeout, $anchorScroll, $location, SessionIdManager,
					   CustomToastService, AuthService) {
		/*jshint validthis: true */
		var context = this;

		context.state = $state;

		// here I will add the videoId (from the videos fetched from service) and the API (provided by the videogular)
		context.videoListControl = [];

		// the video list fetched from the server
		context.videoList = [];

		context.onPlayerReady = _onPlayerReady;
		context.onUpdateState = _onUpdateState;
		context.goToDetail = _goToDetail;
		context.getMoreVideos = _getMoreVideos;
		context.logout = _logout;
		context.getRatingOverall = _getRatingOverall;

		// fetch the videos when page loads
		_fetchVideos();


		/**
		 * function executed by the videogular API
		 * @param API
		 * @param videoId
		 * @private
		 */
		function _onPlayerReady(API, videoId){
			// Here I add to the videoListControl the id of the video
			// and the videogular API, so I can control the rule of 'only one video playing at time'
			context.videoListControl.push({
				videoId: videoId,
				API: API
			});
		}

		/**
		 * fetch the videos from the API
		 * @private
		 */
		function _fetchVideos(){
			// the from value is defined by my videoList length + 1. If it isn't defined yet, its value is 1
			var from = context.videoList.length ? context.videoList.length + 1 : 1;
			var requestData = { sessionId: SessionIdManager.getSessionId(), skip: from };

			VideoListService.getVideoList(requestData)
				.then(function (response) {
					// here I map the videos from response, so each one of them ca have
					// a configuration to display the video, according to the videogular API
					response.data.data.map(function (item) {
						item.config = {
							sources: [
								{src: $sce.trustAsResourceUrl(item.url), type: "video/mp4"}
							]
						};
						// calculates the video overallRating
						item.overallRating = _getRatingOverall(item.ratings);

						// add to my videoList
						context.videoList.push(item);
					});

					context.hasVideos = response.data.data.length;
				})
				.catch(function (error) {
					CustomToastService.show(error.message);
				})
		}

		/**
		 * Controls the state of each video-player added
		 * @param state
		 * @param videoId
		 * @private
		 */
		function _onUpdateState(state, videoId){
			if(state === "play"){
				// when the user plays one video, we have to broadcast a message
				// so the detail page can know when to pause its video
				$rootScope.$broadcast("videoListCtrlStartedPlaying", videoId);

				context.videoListControl.filter(function (videoItem) {
					// i need to get all the videos that differ from the selected one
					// and are playing, which means its currentState is equals to 'play'
					return videoId !== videoItem.videoId && videoItem.API.currentState === 'play';
				}).map(function (filteredVideo) {
					// pause the filtered video
					filteredVideo.API.pause();
				});
			}
		}

		/**
		 * navigate to detail page
		 * @param selectedVideo - the selected video
		 * @private
		 */
		function _goToDetail(selectedVideo){
			// pauses the current play video, so it doesn't continue
			// playing while other video is in evidence.
			_pauseCurrentPlayingVideo();

			// I call this function so the selected video is always visible
			_scrollToSelectedVideo();

			// navigate to the detail state, passing the selectedVideo id, so
			// I it can be found through the API
			$state.go('videoList.videoDetail', {videoId: selectedVideo._id});
		}

		/**
		 * Logs the user out
		 * @private
		 */
		function _logout(){
			// Call the AuthService to logout
			AuthService.logout(SessionIdManager.getSessionId())
				.catch(function (error) {
					CustomToastService.show(error.message);
				})
		}

		/**
		 * Function executed everytime the page reaches the bottom
		 * This functionality is provided by the scrollToEnd lib /libraries/scrollToEnd.js
		 * @param direction - top/right/bottom/left
		 * @private
		 */
		function _getMoreVideos(direction){
			if(direction === 'bottom'){
				_fetchVideos();
			}
		}

		/**
		 * Function used to turn the selected video always in evidence
		 * @private
		 */
		function _scrollToSelectedVideo(){
			$timeout(function () {
				$location.hash('selected-video-container');
				$anchorScroll();
			}, 500);

		}

		/**
		 * Calculates the rating overall
		 * @param ratings video ratings
		 * @returns {number} the overallRating
		 * @private
		 */
		function _getRatingOverall(ratings) {
			// it sums up all the video ratings
			var ratingSum = ratings.reduce(function (acc, curr) { return acc + curr }, 0);
			// to avoid the zero division
			if(ratingSum === 0){
				return 0;
			}
			// the overallRating is the sum of ratings divided by the rating amount
			return Math.floor(ratingSum / ratings.length);
		}

		/**
		 * look up for the current playing video and pauses it
		 * @private
		 */
		function _pauseCurrentPlayingVideo(){
			context.videoListControl.filter(function (videoItem) {
				// i need to get all the videos that are playing, which means its currentState is equals to 'play'
				return videoItem.API.currentState === 'play';
			}).map(function (filteredVideo) {
				// pause the filtered video
				filteredVideo.API.pause();
			});
		}

		/**
		 * It listens to this variable that says when the video detail started to play some video
		 */
		$rootScope.$on('videoDetailStartedPlaying', function(){
			_pauseCurrentPlayingVideo();
		});


	}

})();
