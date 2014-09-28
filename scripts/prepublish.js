var fs = require('fs');
var ncp = require('ncp').ncp;
var mkdirp = require('mkdirp');
var browserify = require('browserify');

mkdirp('dist/jasmine-2.0.0', function(err) {
	if(err) {
		console.error(err);
	}
	else {
		createBundle('dist/iterizer.js', ['./lib/global-iterizer.js']);
		createBundle('dist/iterizer-spec-tests.js', ['./spec/tests/tests.spec.js', './spec/project-euler/project-euler.spec.js']);

		ncp('node_modules/jasmine-node/node_modules/jasmine-reporters/lib/jasmine-2.0.0', 'dist/jasmine-2.0.0', function(err) {
			if(err) {
				console.error(err);
			}
		});
	}
});

function createBundle(outputFilePath, inputFilePaths) {
	var b = browserify();
	for(var key in inputFilePaths) {
		b.add(inputFilePaths[key]);
	}
	
	b.bundle().pipe(fs.createWriteStream(outputFilePath));
}

