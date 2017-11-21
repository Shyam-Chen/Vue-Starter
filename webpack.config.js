const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const PrerenderSpaPlugin = require('prerender-spa-plugin');

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

module.exports = ({ prod = false } = {}) => {
  // if (prod) {
  //
  // } else {
  //
  // }

  return {
    context: join(__dirname, 'src'),
    entry: {
      client: './client.js'
    },
    output: {
      path: join(__dirname, 'build'),
      filename: '[name].[hash].js'
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
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            }
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
      ]
    },
    resolve: {
      extensions: ['.js', '.vue']
    },
    plugins: [
      // new PrerenderSpaPlugin(
      //   join(__dirname, './build'),
      //   [ '/', '/counter', '/rest' ],
      //   {}
      // ),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html'
      })
    ],
    devServer: {
      contentBase: join(__dirname, 'build'),
      historyApiFallback: true,
      inline: true,
      port: 8000,
    },
    devtool: 'source-map'
  };
};
