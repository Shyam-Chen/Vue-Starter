const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
// const PrerenderSpaPlugin = require('prerender-spa-plugin');
const envify = require('process-envify');

const env = require('./env');
// const pkg = require('./package');

const SOURCE_ROOT = path.join(__dirname, 'src');
const DIST_ROOT = path.join(__dirname, 'public');

module.exports = ({ prod = false } = {}) => ({
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
          name: path.posix.join('assets', 'images/[name].[hash].[ext]'),
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join('assets', 'medias/[name].[hash].[ext]'),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join('assets', 'fonts/[name].[hash].[ext]'),
        },
      },
    ].filter(Boolean),
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '~': path.join(SOURCE_ROOT, 'app'),
      '~assets': path.join(SOURCE_ROOT, 'assets'),
    },
  },
  plugins: [
    new HtmlPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      minify: prod && {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
      chunksSortMode: prod ? 'dependency' : 'auto',
      // serviceWorkerLoader: `<script>${path.join(__dirname, 'tools/service-worker.js')}</script>`,
    }),
    new CopyPlugin([
      'assets/images/favicon.ico',
    ]),
    new webpack.DefinePlugin(envify(env)),

    !prod && new webpack.HotModuleReplacementPlugin(),
    !prod && new webpack.NamedModulesPlugin(),
    !prod && new webpack.NoEmitOnErrorsPlugin(),

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
          module.resource.indexOf(path.join(__dirname, 'node_modules')) === 0
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
    //   minify: true,
    //   staticFileGlobs: [`${basename(DIST_ROOT)}/*`],
    //   stripPrefix: `${basename(DIST_ROOT)}/`,
    // }),
    // prod && new PrerenderSpaPlugin(
    //   DIST_ROOT,
    //   ['/'],
    //   {},
    // ),
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
