const { join } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = ({ prod = false } = {}) => ({
  context: join(__dirname, 'src'),
  entry: {
    client: './client.js',
  },
  output: {
    path: join(__dirname, 'build'),
    filename: prod ? '[name].[hash].js' : '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
        ],
      }, {
        test: /\.vue$/,
        use: ['vue-loader'],
      },
    ].filter(Boolean),
  },
  resolve: {
    extensions: ['.js', '.vue'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: false,
    }),
    new CopyWebpackPlugin([
      'assets/images/favicon.ico',
    ]),
    prod && new UglifyJSPlugin({ sourceMap: false }),
    !prod && new webpack.NamedModulesPlugin(),
    !prod && new webpack.HotModuleReplacementPlugin(),
  ].filter(Boolean),
  devServer: {
    contentBase: join(__dirname, 'build'),
    historyApiFallback: true,
    hot: true,
    inline: true,
    port: 8000,
  },
  devtool: prod ? 'hidden-source-map' : 'eval-source-map',
});
