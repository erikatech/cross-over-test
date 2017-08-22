describe('authCtrl', function () {
	var $controller;
	var authCtrl;

	beforeEach(function () {
		module('video-portal');
		inject(function (_$controller_) {
			$controller = _$controller_;
			authCtrl = $controller('AuthCtrl');
		});
	});
	it('should throw an error when tries to encrypt undefined password', function(){
		var user = { username: 'ali' };
		expect(function(){authCtrl.encryptPassword(user)}).toThrowError(TypeError);
	});
});
