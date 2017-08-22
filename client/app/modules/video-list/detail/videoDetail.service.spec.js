describe('videoDetailService', function () {
	var videoDetailService;
	var $httpBackend;

	beforeEach(function () {
		module('video-portal');
		inject(function ($injector) {
			videoDetailService = $injector.get('VideoDetailService');
			$httpBackend = $injector.get('$httpBackend');
		});
	});

	it('should reject when videoId is undefined', function(){
		$httpBackend.whenGET('/video')
			.respond({
				message: 'Invalid request arguments'
			});
		videoDetailService.getVideoDetail().catch(function (response) {
			expect(response.message).toEqual("Invalid request arguments");
		});
	});

	it('should reject the video rating when params is undefined', function(){
		$httpBackend.whenGET('/video')
			.respond({
				message: 'Invalid request arguments'
			});
		videoDetailService.rateVideo().catch(function (response) {
			expect(response.message).toEqual("Invalid request arguments");
		});
	});

	it('should reject the video rating when params.videoId is undefined', function(){
		$httpBackend.whenGET('/video')
			.respond({
				message: 'Invalid request arguments'
			});
		videoDetailService.rateVideo({rating: 1}).catch(function (response) {
			expect(response.message).toEqual("Invalid request arguments");
		});
	});

	it('should reject the video rating when params.rating is undefined', function(){
		$httpBackend.whenGET('/video')
			.respond({
				message: 'Invalid request arguments'
			});
		videoDetailService.rateVideo({videoId: 12345}).catch(function (response) {
			expect(response.message).toEqual("Invalid request arguments");
		});
	});

	it('should be able to rate a video', function(){
		var requestData = {videoId: '123456', rating: 2 };
		$httpBackend.whenPOST('/video/ratings?sessionId=12345', requestData)
			.respond({
				status: 'success'
			});
		videoDetailService.rateVideo(requestData).then(function (response) {
			expect(response.status).toEqual("success");
		});
	});
});
