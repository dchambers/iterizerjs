var NegatedFilter = require('./NegatedFilter');
var iterableArray = require('./iterable-array');
var using = require('typester').using;

function* range(start, stop, step) {
	if(arguments.length == 1) {
		stop = start;
		start = 1;
	}

	using([start, stop, step])
		.verify('start').integerNumber()
		.verify('stop').integerNumber()
		.verify('step').optionally.positiveNumber();

	step = (step !== undefined) ? step : 1;

	var next = start;
	if(stop >= start) {
		while(next <= stop) {
			yield next;
			next += step;
		}
	}
	else {
		while(next >= stop) {
			yield next;
			next -= step;
		}
	}
}

function equals(str) {
	return function(matchStr) {
		return matchStr == str;
	};
}

function beginsWith(str) {
	return function(matchStr) {
		return matchStr.substr(0, str.length) == str;
	};
}

function endsWith(str) {
	return function(matchStr) {
		return matchStr.substr(matchStr.length - str.length, str.length) == str;
	};
}

function contains(str) {
	return function(matchStr) {
		return matchStr.indexOf(str) != -1;
	}
}

function matches(regExp) {
	return function(str) {
		return (str.match(regExp) !== null);
	};
}

function lessThan(maxNum) {
	return function(n) {
		return n < maxNum;
	};
}

function lessThanOrEqualTo(maxNum) {
	return lessThan(maxNum + 1);
}

function greaterThan(minNum) {
	return function(n) {
		return n > minNum;
	};
}

function greaterThanOrEqualTo(minNum) {
	return greaterThan(minNum - 1);
}

function Iterizer() {
	this.not = new NegatedFilter(this);
}

Iterizer.prototype.install = function() {
	this.installMethods();
	this.installGlobals();
};

Iterizer.prototype.installGlobals = function() {
	// TODO: stop using iterableArray() once Chrome fixes the bug (see <https://code.google.com/p/chromium/issues/detail?id=415914>) that prevents for...of working with arrays
	var methodNames = iterableArray(Object.keys(this.constructor.prototype));

	for(var methodName of methodNames.filter(this.not.beginsWith('install'))) {
		global[methodName] = this[methodName];
	}
	global.not = this.not;
};

Iterizer.prototype.range = range;
Iterizer.prototype.equals = equals;
Iterizer.prototype.beginsWith = beginsWith;
Iterizer.prototype.endsWith = endsWith;
Iterizer.prototype.contains = contains;
Iterizer.prototype.matches = matches;
Iterizer.prototype.lessThan = lessThan;
Iterizer.prototype.lessThanOrEqualTo = lessThanOrEqualTo;
Iterizer.prototype.greaterThan = greaterThan;
Iterizer.prototype.greaterThanOrEqualTo = greaterThanOrEqualTo;

Iterizer.prototype.installMethods = function() {
	Object.defineProperty(String.prototype, 'chars', {enumerable: false, configurable: true, value: function*() {
		if(this.length > 0) {
			for(var i of range(0, this.length - 1)) {
				yield this.charAt(i);
			}
		}
	}});

	Object.defineProperty(Object.prototype, 'map', {enumerable: false, configurable: true, value: function*(map) {
		using(arguments)
			.verify('map').isA(Function);

		for(var item of this) {
			yield map(item);
		}
	}});

	Object.defineProperty(Object.prototype, 'filter', {enumerable: false, configurable: true, value: function*(filter) {
		using(arguments)
			.verify('filter').isA(Function);

		for(var item of this) {
			if(filter(item)) {
				yield item;
			}
		}
	}});

	Object.defineProperty(Object.prototype, 'every', {enumerable: false, configurable: true, value: function(predicate) {
		using(arguments)
			.verify('predicate').isA(Function);

		for(var item of this) {
			if(!predicate(item)) {
				return false;
			}
		}

		return true;
	}});

	Object.defineProperty(Object.prototype, 'some', {enumerable: false, configurable: true, value: function(predicate) {
		using(arguments)
			.verify('predicate').isA(Function);

		for(var item of this) {
			if(predicate(item)) {
				return true;
			}
		}

		return false;
	}});

	Object.defineProperty(Object.prototype, 'reduce', {enumerable: false, configurable: true, value: function(reducer, initialValue) {
		using(arguments)
			.verify('reducer').isA(Function)
			.verify('initialValue').isA(Number);

		var cumulativeValue = initialValue;
		var i = 0;

		for(var item of this) {
			cumulativeValue = reducer(cumulativeValue, item, i++);
		}

		return cumulativeValue;
	}});

	Object.defineProperty(Object.prototype, 'limit', {enumerable: false, configurable: true, value: function*() {
		var continueYielding, from, to;
		if(arguments.length == 1) {
			if(arguments[0] instanceof Function) {
				continueYielding = arguments[0];
			}
			else if(typeof(arguments[0]) == 'number') {
				from = 1;
				to = arguments[0];
			}
			else {
				throw new TypeError("'to' must be a number or 'continueYielding' must be a function");
			}
		}
		else if(arguments.length > 1) {
			from = arguments[0];
			to = arguments[1];
		}
		else {
			throw new Error("limit arguments must be provided")
		}

		var items = this;
		if(continueYielding) {
			for(var item of items) {
				if(continueYielding(item)) {
					yield item;
				}
				else {
					return;
				}
			}
		}
		else {
			using([from, to])
				.verify('from').integerNumber()
				.verify('to').integerNumber();

			var n = 1;
			for(var item of items) {
				if(n >= from) {
					if(n <= to) {
						yield item;
					}
					else {
						return;
					}
				}

				++n;
			}
		}
	}});

	Object.defineProperty(Object.prototype, 'nthItem', {enumerable: false, configurable: true, value: function(n) {
		using(arguments)
			.verify('n').integerNumber();

		for(var item of this.limit(n, n)) {
			return item;
		}
	}});

	Object.defineProperty(Object.prototype, 'first', {enumerable: false, configurable: true, value: function() {
		return this.nthItem(1);
	}});

	Object.defineProperty(Object.prototype, 'sum', {enumerable: false, configurable: true, value: function() {
		return this.reduce(function(prevValue, currentValue) {
			return prevValue + currentValue;
		}, 0);
	}});

	Object.defineProperty(Object.prototype, 'product', {enumerable: false, configurable: true, value: function() {
		return this.reduce(function(prevValue, currentValue) {
			return prevValue * currentValue;
		}, 1);
	}});

	Object.defineProperty(Object.prototype, 'join', {enumerable: false, configurable: true, value: function(delimiter) {
		using(arguments)
			.verify('delimiter').optionally.isA(String);

		return this.toArray().join(delimiter);
	}});

	Object.defineProperty(Object.prototype, 'toArray', {enumerable: false, configurable: true, value: function() {
		var items = [];

		for(var item of this) {
			items.push(item);
		}

		return items;
	}});
};

module.exports = Iterizer;
