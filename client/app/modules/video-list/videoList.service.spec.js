describe('videoListService', function () {
	var videoListService;
	var $httpBackend;

	beforeEach(function () {
		module('video-portal');
		inject(function ($injector) {
			videoListService = $injector.get('VideoListService');
			$httpBackend = $injector.get('$httpBackend');
		});
	});

	it('should have the sessionId and skip to list the videos', function(){
		var requestData = {sessionId: 'mdyGvofoRB3azO2Q7vDvMvXieTojOZer', skip: 1};
		$httpBackend.whenGET('/videos?limit=10&sessionId=mdyGvofoRB3azO2Q7vDvMvXieTojOZer&skip=1')
			.respond({
				status: 'success',
				data:  [
					{
						"_id": "599898ff915a2224c64276ef",
						"name": "[10] iPhone 7 Trailer 2016",
						"description": "iPhone 7 concept trailer 2016! with Bluetooth AirPods by Beats and ChargingPad, and much more!",
						"url": "videos/iPhone_7_Trailer_2016.mp4",
						"__v": 14,
						"ratings": [1, 2, 3, 4]
					}
				]
			});
		videoListService.getVideoList(requestData).then(function (response) {
			expect(response.data.status).toEqual("success");
		});
		$httpBackend.flush();
	});

	it('should reject when requestData is undefined', function(){
		$httpBackend.whenGET('/videos?limit=10')
			.respond({
				message: 'Invalid request arguments'
			});
		videoListService.getVideoList().catch(function (response) {
			expect(response.message).toEqual("Invalid request arguments");
		});
	});

	it('should reject when requestData.skip is undefined', function(){
		var requestData = { sessionId: 'mdyGvofoRB3azO2Q7vDvMvXieTojOZer' };
		$httpBackend.whenGET('/videos?limit=10')
			.respond({
				message: 'Invalid request arguments'
			});
		videoListService.getVideoList(requestData).catch(function (response) {
			expect(response.message).toEqual("Invalid request arguments");
		});
	});

	it('should not be able to access video list page', function(){
		var requestData = { skip: 1 };
		$httpBackend.whenGET('http://localhost:3000/videos?limit=10&skip=1')
			.respond({
				status: "error",
				error: "unauthorized"
			});

		videoListService.getVideoList(requestData).then(function (response) {
			expect(response.data.error).toEqual("unauthorized");
		});
	});
});
