(function () {

	/**
	 * @ngdoc directive
	 * @name app.directive:starRating
	 * @description
	 * # Used to show and edit the rate of a video
	 */
	angular.module("video-portal")
		.directive("starRating", starRatingDirective);

	function starRatingDirective() {
		return {
			scope: {
				// rating: '=',
				enabled: '=?',
				size: '@?',
				ngModel: '='
			},
			templateUrl: "app/modules/shared/directives/star-rating.html",
			link: function ($scope, $elem, $attrs){
				$scope.enabled = $scope.enabled === undefined ? true : $scope.enabled; // default is true

				/**
				 * Called when the user clicks in one of the stars
				 * @param selectedStar
				 */
				$scope.rate = function(selectedStar){
					// if the edition is disabled do nothing
					if(!$scope.enabled) return;
					// here we define which one of the stars will be highlighted
					// if the star number is less o equals do selectedStar number, then it
					// should be highlighted
					$scope.stars.map(function (star) {
						star.icon = star.number <= selectedStar.number ? 'fa fa-star filled-star' : 'fa fa-star-o blank-star';
					});

					// binds the selectedStar number to our ngModel
					$scope.ngModel = selectedStar.number;

				};

				/**
				 * Used to generate the stars
				 * @private
				 */
				function _createStars(){
					$scope.stars = [];
					for(var i = 1; i <= 5; i++){ // max star value is 5
						$scope.stars.push(
							{
								number: i,
								icon: i <= $scope.ngModel ? 'fa fa-star filled-star' : 'fa fa-star-o blank-star'
							});
					}
				}

				// watches for the ngModel changes, because when we submit the evaluation, we reset the rating number to 0
				// then we have to recreate the stars, to be according to outside value
				$scope.$watch('ngModel', function(value){
					$scope.ngModel = value;
					_createStars();
				});
			}
		};
	}
})();
