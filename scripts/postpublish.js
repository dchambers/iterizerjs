var iterizerJsVersion = require('../package.json').version;

console.log('You now need to run:');
console.log('  git tag -a v' + iterizerJsVersion + '; git push origin v' + iterizerJsVersion);
console.log('');
console.log('Then edit the release notes here:');
console.log('  <https://github.com/dchambers/iterizerjs/releases>');
console.log('');

