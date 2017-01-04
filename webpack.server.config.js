var fs = require('fs')
var path = require('path')

module.exports = {

  entry: path.resolve(__dirname, 'src/server/server.js'),

  output: {
    path: path.resolve(__dirname, 'server/'),
    filename: 'server.bundle.js'
  },

  target: 'node',

  // keep node_module paths out of the bundle
  externals: fs.readdirSync(path.resolve(__dirname, 'node_modules')).concat([
    'react-dom/server', 'react/addons',
  ]).reduce(function (ext, mod) {
    ext[mod] = 'commonjs ' + mod
    return ext
  }, {}),

  node: {
    __filename: true,
    __dirname: true
  },

  module: {
    loaders: [
      { test: /\.jsx?/, 
        exclude: /node_modules/, 
        loader: 'babel',
      }
    ]
  }
}