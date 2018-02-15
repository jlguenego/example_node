const assert = require('chai').assert;
describe('Array', function() {
	describe('#indexOf()', function() {
		it('should wait at least 1000ms before executing.', function(done) {
			const date = new Date().getTime();
			setTimeout(() => {
				const now = new Date().getTime();
				const test = now - date >= 1000;
				assert.ok(test);
				done();
			}, 1000);
			
		});
	});
});
