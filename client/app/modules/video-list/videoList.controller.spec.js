describe('videoListCtrl', function () {
	var $controller;
	var videoListCtrl;

	beforeEach(function () {
		module('video-portal');
		inject(function (_$controller_) {
			$controller = _$controller_;
			videoListCtrl = $controller('VideoListCtrl');
		});
	});

	it('should return 2 as overall rating', function(){
		var ratings = [3, 5, 2, 1];
		var result = videoListCtrl.getRatingOverall(ratings);
		expect(result).toEqual(2);
	});

	it('should return 0 when rating is empty', function(){
		var ratings = [];
		var result = videoListCtrl.getRatingOverall(ratings);
		expect(result).toEqual(0);
	});

});
