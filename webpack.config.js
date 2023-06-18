

const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'pow-captcha-js.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'pow-captcha-js',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};

