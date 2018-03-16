import { join, posix } from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
// import SWPrecacheWebpackPlugin from 'sw-precache-webpack-plugin';

// import pkg from './package.json';
import { API_URL } from './src/env';

const SOURCE_ROOT = join(__dirname, 'src');
const DIST_ROOT = join(__dirname, 'build');

export default ({ prod = false } = {}) => ({
  context: SOURCE_ROOT,
  entry: {
    client: './client.js',
  },
  output: {
    path: DIST_ROOT,
    filename: prod ? '[name].[hash].js' : '[name].js',
    chunkFilename: prod ? '[id].[chunkhash].js' : '[name].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: posix.join('assets', 'images/[name].[hash].[ext]'),
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: posix.join('assets', 'medias/[name].[hash].[ext]'),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: posix.join('assets', 'fonts/[name].[hash].[ext]'),
        },
      },
    ].filter(Boolean),
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '~': join(SOURCE_ROOT, 'app'),
      '~assets': join(SOURCE_ROOT, 'assets'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      minify: prod && {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
      chunksSortMode: prod ? 'dependency' : 'auto',
      // serviceWorkerLoader: `<script>${join(__dirname, 'tools/service-worker.js')}</script>`,
    }),
    new CopyWebpackPlugin([
      'assets/images/favicon.ico',
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(prod ? 'production' : 'development'),
        API_URL: JSON.stringify(API_URL),
      },
    }),
    prod && new UglifyJSPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
        },
      },
      sourceMap: true,
      parallel: true,
    }),
    prod && new webpack.HashedModuleIdsPlugin(),
    prod && new webpack.optimize.ModuleConcatenationPlugin(),
    prod && new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(join(__dirname, 'node_modules')) === 0
        );
      },
    }),
    prod && new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),
    prod && new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3,
    }),
    // prod && new SWPrecacheWebpackPlugin({
    //   cacheId: pkg.name,
    //   filename: 'service-worker.js',
    //   staticFileGlobs: ['build/**/*.{js,html,css}'],
    //   minify: true,
    //   stripPrefix: DIST_ROOT,
    // }),
    !prod && new webpack.HotModuleReplacementPlugin(),
    !prod && new webpack.NamedModulesPlugin(),
    !prod && new webpack.NoEmitOnErrorsPlugin(),
  ].filter(Boolean),
  devServer: {
    contentBase: DIST_ROOT,
    historyApiFallback: true,
    hot: true,
    inline: true,
    port: 8000,
  },
  devtool: prod ? 'hidden-source-map' : 'cheap-module-eval-source-map',
  node: {
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
});
