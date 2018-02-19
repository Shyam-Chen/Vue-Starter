const { join } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const BABEL_LOADER = {
  loader: 'babel-loader',
  options: {
    babelrc: false,
    presets: [
      [
        'env', {
          'targets': {
            'browsers': ['last 2 versions']
          }
        }
      ]
    ],
    plugins: [
      'transform-runtime',
      'transform-function-bind',
      'transform-object-rest-spread',
      'transform-vue-jsx',
      [
        'babel-plugin-root-import', [
          {
            rootPathPrefix: '~',
            rootPathSuffix: 'src/app'
          }
        ]
      ],
      [
        'transform-imports', {
          'rxjs': {
            transform: 'rxjs/${member}',
            preventFullImport: true,
            skipDefaultConversion: true
          },
          'rxjs/observable': {
            transform: 'rxjs/observable/${member}',
            preventFullImport: true,
            skipDefaultConversion: true
          },
          'rxjs/operator': {
            transform: 'rxjs/operator/${member}',
            preventFullImport: true,
            skipDefaultConversion: true
          }
        }
      ]
    ]
  }
};

module.exports = ({ prod = false } = {}) => ({
  context: join(__dirname, 'src'),
  entry: {
    client: './client.js'
  },
  output: {
    path: join(__dirname, 'build'),
    filename: prod ? '[name].[hash].js' : '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          BABEL_LOADER
        ]
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader'
        ]
      }, {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              loaders: {
                js: BABEL_LOADER
              }
            }
          }
        ]
      }
    ].filter(Boolean)
  },
  resolve: {
    extensions: ['.js', '.vue']
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: false
    }),
    new CopyWebpackPlugin([
      'assets/images/favicon.ico'
    ]),
    prod && new UglifyJSPlugin({ sourceMap: false }),
    !prod && new webpack.NamedModulesPlugin(),
    !prod && new webpack.HotModuleReplacementPlugin()
  ].filter(Boolean),
  devServer: {
    contentBase: join(__dirname, 'build'),
    historyApiFallback: true,
    hot: true,
    inline: true,
    port: 8000
  },
  devtool: 'source-map'
});
