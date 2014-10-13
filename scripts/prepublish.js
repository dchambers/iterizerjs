var fs = require('fs');
var mkdirp = require('mkdirp');
var browserify = require('browserify');

mkdirp('dist/mocha', function(err) {
	if(err) {
		console.error(err);
	}
	else {
		createBundle('dist/iterizer.js', ['./lib/global-iterizer.js']);
		createBundle('dist/iterizer-spec-tests.js', ['./spec/test/tests.spec.js']);
		createBundle('dist/iterizer-install-spec-tests.js', ['./spec/test-install/install-methods.spec.js']);
		createBundle('dist/iterizer-project-euler-spec-tests.js', ['./spec/project-euler/project-euler.spec.js']);

		fs.createReadStream('node_modules/mocha/mocha.js').pipe(fs.createWriteStream('dist/mocha/mocha.js'));
		fs.createReadStream('node_modules/mocha/mocha.css').pipe(fs.createWriteStream('dist/mocha/mocha.css'));
	}
});

function createBundle(outputFilePath, inputFilePaths) {
	var b = browserify();
	for(var key in inputFilePaths) {
		b.add(inputFilePaths[key]);
	}
	
	b.bundle().pipe(fs.createWriteStream(outputFilePath));
}
