if (process.env.ENVIRONMENT === 'local') {
  module.exports = require('./configureStore.dev'); // eslint-disable-line global-require
} else {
  module.exports = require('./configureStore.prod'); // eslint-disable-line global-require
}
