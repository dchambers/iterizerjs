var should = require('chai').should();

describe('iterizer.js browser compatibility', function() {
	it('does not add any enumerable properties to Object', function() {
		(function() {
			for(var key in {}) {
				throw new Error("'" + key + "' was found in {}, but iterizer.js should not add any enumerable properties");
			}
		}).should.not.throw();
	});

	it('does not add any enumerable properties to String', function() {
		(function() {
			for(var key in '') {
				throw new Error("'" + key + "' was found in '', but iterizer.js should not add any enumerable properties");
			}
		}).should.not.throw();
	});

	it('allows the ES5 Array.reduce() method (that gets passed four arguments) to still be used with arrays', function() {
		[1,2,3].reduce(function(previousValue, currentValue, index, array) {
			return array.join();
		}).should.equal('1,2,3');
	});
});

