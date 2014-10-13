// TODO: get all of the suites working again, including the Karma tests, then rename to 'mocha-spec-tests.js'

var fs = require('fs');
var path = require('path');
var Mocha = require('mocha');
var mocha;
var karmaServer = require('karma').server;

function exitOnFail(exitCode) {
	if(exitCode != 0) {
		process.exit(exitCode);
	}
}

console.log('Test Install:');
mocha = new Mocha();
mocha.addFile(path.normalize('spec/test-install/install-methods.spec.js'));
mocha.run(function(exitCode) {
	exitOnFail(exitCode);

	console.log('');
	console.log('Spec Tests:');

	mocha = new Mocha();
	mocha.addFile(path.normalize('spec/test/tests.spec.js'));
	mocha.run(function(exitCode) {
		exitOnFail(exitCode);

		console.log('');
		console.log('Project Euler:');

		mocha = new Mocha();
		mocha.addFile(path.normalize('spec/project-euler/project-euler.spec.js'));
		mocha.run(function(exitCode) {
			exitOnFail(exitCode);

			console.log('');
			console.log('Browser Tests:');

			karmaServer.start({configFile: path.resolve('karma-conf.js'), singleRun:true, browsers:['Firefox', 'Chrome_Travis_ES6']}, function(exitCode) {
				console.log('Karma has exited with ' + exitCode);
				process.exit(exitCode);
			});
		});
	});
});
