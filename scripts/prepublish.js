var build = require('dchambers-lib-build-tool');

build.bundleDeps(
	build.bundle('iterizer.js', ['./lib/global-iterizer.js']),
	build.bundle('iterizer-spec-tests.js', ['./spec/test/tests.spec.js']),
	build.bundle('iterizer-install-spec-tests.js', ['./spec/test-install/install-methods.spec.js']),
	build.bundle('iterizer-project-euler-spec-tests.js', ['./spec/project-euler/project-euler.spec.js'])
);
