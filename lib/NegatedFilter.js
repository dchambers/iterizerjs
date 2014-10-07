function not(filterFunc) {
	return function(filterArg) {
		return !filterFunc(filterArg);
	};
}

function NegatedFilter(iterizer) {
	this.iterizer = iterizer;
}

NegatedFilter.prototype.equals = function(str) {
	return not(this.iterizer.equals(str));
};

NegatedFilter.prototype.beginsWith = function(str) {
	return not(this.iterizer.beginsWith(str));
};

NegatedFilter.prototype.endsWith = function(str) {
	return not(this.iterizer.endsWith(str));
};

NegatedFilter.prototype.contains = function(str) {
	return not(this.iterizer.contains(str));
};

NegatedFilter.prototype.matches = function(regExp) {
	return not(this.iterizer.matches(regExp));
};

NegatedFilter.prototype.lessThan = function(maxNum) {
	return not(this.iterizer.lessThan(maxNum));
};

NegatedFilter.prototype.lessThanOrEqualTo = function(maxNum) {
	return not(this.iterizer.lessThanOrEqualTo(maxNum));
};

NegatedFilter.prototype.greaterThan = function(minNum) {
	return not(this.iterizer.greaterThan(minNum));
};

NegatedFilter.prototype.greaterThanOrEqualTo = function(minNum) {
	return not(this.iterizer.greaterThanOrEqualTo(minNum));
};

module.exports = NegatedFilter;

