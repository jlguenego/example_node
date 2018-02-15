const assert = require('assert');
const tp6 = require('../tp6.js');

describe('Array', function() {
	describe('#indexOf()', function() {
		it('should create an object in the database', async () => {
			await tp6.resetDB();
			const response = await tp6.createUser({
				lastname: 'Phengsiaroun',
				firstname: 'Dany',
				_id: '012345678901234567890123',
			});
			assert.deepEqual(response.data, {
				content: {
					lastname: 'Phengsiaroun',
					firstname: 'Dany',
					_id: '012345678901234567890123',
					__v: 0
				}
			});
			// const state = await tp6.getDBState();
			// assert.deepEqual(state, {
			// 	TP5: {
			// 		users: [{
			// 			lastname: 'Phengsiaroun',
			// 			firstname: 'Dany',
			// 			_id: '012345678901234567890123',
			// 		}]
			// 	}
            // });
		});
	});
});
