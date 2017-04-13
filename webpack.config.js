/* eslint no-console:"off", quote-props:"off" */
const {
  resolve
} = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {
  getIfUtils,
  removeEmpty
} = require('webpack-config-utils');
const autoprefixer = require('autoprefixer');

var mainFolder = 'src'

// const OfflinePlugin = require('offline-plugin/runtime').install();

module.exports = env => {
  const {
    ifProd,
    ifNotProd
  } = getIfUtils(env);
  const config = {
    target: 'web',
    context: resolve(mainFolder),
    entry: {
      // app: './bootstrap.js'    // 'jquery-mobile',
      // vendor: ['jquery', 'bootstrap', 'rrssb'],

      app: ['./js/app.js', 'webpack-hot-middleware/client?reload=true']
    },
    output: {
      filename: ifProd('bundle.[name].[chunkhash].js', 'bundle.[name].js'),
      // path: resolve('public/js/app'),
      path: ifProd(resolve('dist'), resolve('temp')),
      pathinfo: ifNotProd(),
      publicPath: '/',
    },
    devtool: 'source-map',
    module: {
      rules: [{
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /(\/node_modules\/|test\.js|\.spec\.js$)/
      }, {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/vnd.ms-fontobject&name=[name].[ext]'
      }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=[name].[ext]'
      }, {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=[name].[ext]'
      }, {
        test: /\.svg(\?v=\d+.\d+.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=[name].[ext]'
      }, {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'file-loader?name=[name].[ext]'
      }, {
        test: /\.ico$/,
        loader: 'file-loader?name=[name].[ext]'
      }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          loader: 'css-loader?sourceMap!postcss-loader!sass-loader?sourceMap',
        }),
      }],
    },
    plugins: removeEmpty([
      /*	new webpack.ProvidePlugin({ // eslint disabled
      		jQuery: 'jquery',
      		$: 'jquery',
      		'window.jQuery': 'jquery'
      	}),*/
      new ProgressBarPlugin(),
      new ExtractTextPlugin(ifProd('styles.[name].[chunkhash].css', 'styles.[name].css')),
      ifProd(new InlineManifestWebpackPlugin()),
      ifNotProd(new webpack.HotModuleReplacementPlugin()),
      ifProd(new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest'],
      })),
      new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index.html',
        inject: 'body',
      }),
      // new OfflinePlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: ifProd('"production"', '"development"')
        }
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: ifProd(true, false),
        debug: false,
        noInfo: true, // set to false to see a list of every file being bundled.
        options: {
          sassLoader: {
            includePaths: [resolve(__dirname, mainFolder, 'styles')]
          },
          context: '/',
          postcss: () => [autoprefixer],
        }
      })
    ]),


    resolve: {
      extensions: ['.js'],
      modules: [
        resolve(mainFolder),
        resolve('node_modules')
      ]
    }
  };
  if (env.debug) {
    console.log(config);
    debugger // eslint-disable-line
  }


  return config;
};
