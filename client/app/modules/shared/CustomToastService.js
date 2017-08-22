(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.service:customToastService
	 * @description
	 * # customToastService
	 * Service used to show custom toast messages (using angular material mdToast service)
	 */

  	angular
		.module('video-portal')
		.factory('CustomToastService', CustomToastService);

		CustomToastService.$inject = ['$mdToast'];

		function CustomToastService ($mdToast) {
			return {
				show: function (text, position, delay) {
                    var toast = $mdToast.simple()
                        .textContent(text)
						.position(position || "top right")// default value is "top right"
                        .action('x')
						.hideDelay(delay || 5000);// default value is 3000
                    $mdToast.show(toast)
						.then(function() {
                        	$mdToast.hide();
                    	});
				}
			}
		}
})();
