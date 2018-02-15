const assert = require('assert');

function sleep(time) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, time);
	});
}

describe('Array', function() {
	describe('#indexOf()', function() {
		it('should wait at least 1000ms before executing.', async () => {
			const date = new Date().getTime();
			await sleep(1000);
			const now = new Date().getTime();
			const test = now - date >= 1000;
			assert.ok(test);
		});
	});
});
