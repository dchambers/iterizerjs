var jn = require('jasmine-node');
var karmaServer = require('karma').server;
var path = require('path');

console.log('Test Install:');

// TODO: find out how 'node-jasmine' allows you to get test result information so we can return a non-zero exit code
jn.run({specFolders:['./spec/test-install'], captureExceptions:true, onComplete:function() {
	console.log('');
	console.log('Spec Tests:');

	jn.run({specFolders:['./spec/test'], captureExceptions:true, onComplete:function() {
		console.log('');
		console.log('Project Euler:');

		jn.run({specFolders:['./spec/project-euler'], captureExceptions:true, onComplete:function() {
			console.log('');
			console.log('Browser Tests:');

			setTimeout(function() {
				karmaServer.start({configFile: path.resolve('karma-conf.js'), singleRun:true}, function(exitCode) {
					console.log('Karma has exited with ' + exitCode);
					process.exit(exitCode);
				});
			}, 0)
		}});
	}});
}});

