function* iterableArray(array) {
	for(var i = 0; i < array.length; ++i) {
		yield array[i];
	}
}

module.exports = iterableArray;

