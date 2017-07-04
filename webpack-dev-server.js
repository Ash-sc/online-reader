process.env.ENVIRONMENT = 'local';

let config = require('./webpack.config.js');
let webpack = require('webpack');
let WebpackDevServer = require('webpack-dev-server');
let Dashboard = require('webpack-dashboard');
let DashboardPlugin = require('webpack-dashboard/plugin');

let api_server_url = 'http://localhost:4396/';


let compiler = webpack(config);

let isWin = /^win/.test(process.platform);
if (!isWin) {
  let dashboard = new Dashboard();
  compiler.apply(new DashboardPlugin(dashboard.setData));
}

let server = new WebpackDevServer(compiler, {
  contentBase: './public',
  quiet: !isWin,
  lazy: false,
  stats: {
    colors: true,
  },
  proxy: {
    '/api/*': {
      target: api_server_url,
      pathRewrite: { '^/api': '' },
      secure: false,
    },
    '**': {
      target: api_server_url,
      secure: false,
      bypass(req, res, proxyOptions) {
        if (req.headers.accept.indexOf('html') !== -1) {
          return '/index.html';
        }
      },
    },
  },
});

server.listen(8999);
