function Iterizer() {
}

Iterizer.prototype.install = function() {
	this.installGlobals();
	this.installMethods();
}

Iterizer.prototype.range = function*(start, stop, step) {
	if(arguments.length == 1) {
		stop = start;
		start = 1;
	}
	else if(arguments.length == 0) {
		throw new Error('range arguments must be provided');
	}
	step = (step !== undefined) ? step : 1;

	if(typeof(start) != 'number') throw new TypeError("'start' must be a number");
	if(typeof(stop) != 'number') throw new TypeError("'stop' must be a number");
	if(typeof(step) != 'number') throw new TypeError("'step' must be a number");
	if(step <= 0) throw new Error("'step' must be a positive number");

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
};

// TODO: spec test these 5 methods
Iterizer.prototype.equals = function(str) {
	return function(matchStr) {
		matchStr == str;
	};
};

Iterizer.prototype.beginsWith = function(str) {
	return function(matchStr) {
		matchStr.substr(str.length) == str;
	};
};

Iterizer.prototype.endsWith = function(str) {
	return function(matchStr) {
		matchStr.substr(matchStr.length - str.length, str.length) == str;
	};
};

Iterizer.prototype.contains = function(str) {
	return function(matchStr) {
		return matchStr.indexOf(str) != -1;
	}
};

Iterizer.prototype.matches = function(regExp) {
	return function(str) {
		return (str.matches(regExp) !== undefined);
	};
};

Iterizer.prototype.lessThan = function(maxNum) {
	return function(n) {
		return n < maxNum;
	};
};

Iterizer.prototype.lessThanOrEqualTo = function(maxNum) {
	return lessThan(maxNum + 1);
};

Iterizer.prototype.greaterThan = function(minNum) {
	return function(n) {
		return n > minNum;
	};
};

Iterizer.prototype.greaterThanOrEqualTo = function(minNum) {
	return greaterThan(minNum - 1);
};

Iterizer.prototype.installGlobals = function() {
	// TODO: stop installing the 'install()' method once we have the filtering capabilities to do so
//	for(var methodName in this.filter(not.equals('install'))) {
	for(var methodName in this) {
		global[methodName] = this[methodName];
	}
};

Iterizer.prototype.installMethods = function() {
	Object.defineProperty(String.prototype, 'chars', {enumerable: false, configurable: true, value: function*() {
		if(this.length > 0) {
			for(var i of range(0, this.length - 1)) {
				yield this.charAt(i);
			}
		}
	}});

	Object.defineProperty(Object.prototype, 'map', {enumerable: false, configurable: true, value: function*(map) {
		if(map === undefined) throw new Error("a 'map' argument must be provided");
		if(!(map instanceof Function)) throw new TypeError("'map' must be a function");

		for(var item of this) {
			yield map(item);
		}
	}});

	Object.defineProperty(Object.prototype, 'filter', {enumerable: false, configurable: true, value: function*(filter) {
		if(filter === undefined) throw new Error("a 'filter' argument must be provided");
		if(!(filter instanceof Function)) throw new TypeError("'filter' must be a function");

		for(var item of this) {
			if(filter(item)) {
				yield item;
			}
		}
	}});

	Object.defineProperty(Object.prototype, 'every', {enumerable: false, configurable: true, value: function(predicate) {
		if(predicate === undefined) throw new Error("a 'predicate' argument must be provided");
		if(!(predicate instanceof Function)) throw new TypeError("'predicate' must be a function");

		for(var item of this) {
			if(!predicate(item)) {
				return false;
			}
		}

		return true;
	}});

	Object.defineProperty(Object.prototype, 'some', {enumerable: false, configurable: true, value: function(predicate) {
		if(predicate === undefined) throw new Error("a 'predicate' argument must be provided");
		if(!(predicate instanceof Function)) throw new TypeError("'predicate' must be a function");

		for(var item of this) {
			if(predicate(item)) {
				return true;
			}
		}

		return false;
	}});

	Object.defineProperty(Object.prototype, 'reduce', {enumerable: false, configurable: true, value: function(reducer, initialValue) {
		if(reducer === undefined) throw new Error("a 'reducer' argument must be provided");
		if(!(reducer instanceof Function)) throw new TypeError("'reducer' must be a function");
		if(initialValue === undefined) throw new Error("an 'initialValue' argument must be provided");
		if(typeof(initialValue) != 'number') throw new TypeError("'initialValue' must be a number");

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

			if(typeof(from) != 'number') throw new TypeError("'from' must be a number");
			if(typeof(to) != 'number') throw new TypeError("'to' must be a number");
		}
		else {
			throw new Error("limit arguments must be provided")
		}

		// TODO: find of out if there would be any performance degradation to creating a rangeContinueYielding() function for the from,to case
		if(continueYielding !== undefined) {
			for(var item of this) {
				if(continueYielding(item)) {
					yield item;
				}
				else {
					return;
				}
			}
		}
		else {
			var n = 1;
			for(var item of this) {
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
		if(n === undefined) throw new Error("a 'n' argument must be provided");
		if(typeof(n) != 'number') throw new TypeError("'n' must be a number");

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
		if((delimiter !== undefined) && (typeof(delimiter) != 'string')) throw new TypeError("'delimiter' must be a string");

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

module.exports = new Iterizer();

