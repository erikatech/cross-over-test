describe('authService', function () {
	var authService;
	var $httpBackend;

	beforeEach(function () {
		module('video-portal');
		inject(function ($injector) {
			authService = $injector.get('AuthService');
			$httpBackend = $injector.get('$httpBackend');
		});
	});

	it('should login when user pass username and password', function(){
		var requestData = { username: "ali", password:"5f4dcc3b5aa765d61d8327deb882cf99"};
		$httpBackend.when('POST', '/user/auth', requestData)
			.respond({
				status: "success",
				sessionId: "ySmi6TeQyvoqGT0z01BcZkqUhWusxBhY",
			});

		authService.authenticate(requestData).then(function (response) {
			expect(response.data.status).toEqual("success");
		});
		$httpBackend.flush();
	});

	it('should fail authentication when sessionId is not in response', function(){
		var requestData = { username: "ali", password: "5f4dcc3b5aa765d61d8327deb882cf99"};
		$httpBackend.when('POST', '/user/auth', requestData)
			.respond({
				status: 'error',
				message: 'Session ID is not present in response'
			});

		authService.authenticate(requestData).then(function (response) {
			expect(response.data.status).toEqual("error");
			expect(response.data.message).toEqual("Session ID is not present in response");
		});
		$httpBackend.flush();
	});

	it('should reject authentication when user param is undefined', function(){
		$httpBackend.when('POST', '/user/auth')
			.respond({
				message: 'Invalid request parameters'
			});

		authService.authenticate().catch(function (response) {
			expect(response.data.message).toEqual("Invalid request parameters");
		});
	});

	it('should reject authentication when username param is undefined', function(){
		$httpBackend.when('POST', '/user/auth')
			.respond({
				message: 'Invalid request parameters'
			});

		authService.authenticate({password: "password"}).catch(function (response) {
			expect(response.data.message).toEqual("Invalid request parameters");
		});
	});

	it('should reject authentication when password param is undefined', function(){
		$httpBackend.when('POST', '/user/auth')
			.respond({
				message: 'Invalid request parameters'
			});

		authService.authenticate({username: "ali"}).catch(function (response) {
			expect(response.data.message).toEqual("Invalid request parameters");
		});
	});

	it('should reject logout when sessionId param is not from string type', function(){
		$httpBackend.whenGET('user/logout?sessionId=12312312')
			.respond({
				status: "Session Id should be a string type value"
			});
		authService.logout(12312312).catch(function (response) {
			expect(response.data.status).toEqual("Session Id should be a string type value");
		});
	});


	it('should be able to logout', function(){
		$httpBackend.whenGET('user/logout?sessionId=12312312')
			.respond({
				status: "success"
			});
		authService.logout('12312312').then(function (response) {
			expect(response.data.status).toEqual("success");
		});
	});

	it('should not be able to logout when the sessionId is undefined', function(){
		$httpBackend.whenGET('user/logout')
			.respond({
				message: "You must pass the sessionId"
			});
		authService.logout().catch(function (response) {
			expect(response.data.message).toEqual("You must pass the sessionId");
		});
	});

	it('should not be able to logout when the sessionId is empty', function(){
		$httpBackend.whenGET('user/logout')
			.respond({
				message: "You must pass the sessionId"
			});
		authService.logout("     ").catch(function (response) {
			expect(response.data.message).toEqual("You must pass the sessionId");
		});
	});
});
