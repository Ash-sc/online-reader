/* eslint-disable */
const env = process.env;
const file = env.ENVIRONMENT === 'local' ? 'local' : 'production';
console.log('package with config: ' + file);

module.exports = require(`./.webpack/config/${file}`);
/* eslint-enable */
