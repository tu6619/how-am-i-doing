const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.development.config.js')

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  proxy: { "*": "http://localhost:4000" }
}).listen(8080, 'localhost', function (err, result) {
  if (err) {
    return console.log (err)
  }
  console.log('Listening at http://localhost:8080/')
})
