var jn = require('jasmine-node');
console.log('Test Install:');
jn.run({specFolders:['./spec/test-install'], onComplete:function() {
	console.log('');
	console.log('Spec Tests:');
	jn.run({specFolders:['./spec/test'], onComplete:function() {
		console.log('');
		console.log('Project Euler:');
		jn.run({specFolders:['./spec/project-euler']});
	}});
}});

