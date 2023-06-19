

const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'pow-captcha-js.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: './',
    library: 'pow-captcha-js',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        use: [
          {
            loader: 'worker-loader',
            options: {
              inline: 'fallback'
            }
          },
          {
            loader: 'babel-loader', // 如果需要使用 Babel 转译 Worker 脚本
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      },
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

