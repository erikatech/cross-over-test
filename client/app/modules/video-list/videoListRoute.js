'use strict';

	/**
	* @ngdoc function
	* @name app.route:videoListRoute
	* @description
	* # videoListRoute
	* Route of the videoList module
	*/

angular.module('videoList')
	.config(['$stateProvider', function ($stateProvider) {
		$stateProvider
			.state('videoList', {
				url: '/video-list',
				templateUrl: 'app/modules/video-list/video-list.html',
				controller: 'VideoListCtrl',
				controllerAs: '$videoList'
			})
			.state('videoList.videoDetail', {
				url: '/video-detail/:videoId',
				templateUrl: 'app/modules/video-list/detail/video-detail.html',
				controller: 'VideoDetailCtrl',
				controllerAs: '$videoDetail'/*,
				resolve: {
					video:
						['$rootScope', 'VideoDetailService', '$q', '$stateParams', 'CustomToastService', '$state',
							function ($rootScope, VideoDetailService, $q, $stateParams, CustomToastService, $state) {
								if(!$stateParams.videoId) {
									console.log($rootScope);
									location.href = '#!/video-list';
									$state.go('videoList', {}, {reload: true});
								} else {
									// call the service to return the video details
									return VideoDetailService.getVideoDetail($stateParams.videoId)
										.then(function (response) {
											return response.data.data;
										})
										.catch(function (error) {
											CustomToastService.show(error.message || error.data.error);
											return $q.reject();
										});
								}

							}]

				}*/
			})

	}]);
