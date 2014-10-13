var iterizerjs = require('../../lib/iterizer.js');
var should = require('chai').should();
var global = this;

describe('it.installMethods()', function() {
	it('allows the library to be used without having to invoke it.installGlobals() too', function() {
		should.not.exist(global.range);
		should.not.exist(Object.prototype.limit);

		iterizerjs.installMethods();

		should.not.exist(global.range);
		should.exist(Object.prototype.limit);

		iterizerjs.range(5).sum().should.equal(15);
	});
});

