var iterizerjs = require('../../lib/iterizer.js');
var global = this;

describe('it.installMethods()', function() {
	it('allows the library to be used without having to invoke it.installGlobals() too', function() {
		expect(global.range).toBeUndefined();
		expect(Object.prototype.limit).toBeUndefined();

		iterizerjs.installMethods();

		expect(global.range).toBeUndefined();
		expect(Object.prototype.limit).toBeDefined();

		expect(iterizerjs.range(5).sum()).toBe(15);
	});
});

