var webpack = require('webpack');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
//var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    index: ['./js/index.js','webpack/hot/dev-server', 'webpack-dev-server/client?http://localhost:8080'],
    page1: './js/page1.js',
    page2: './js/page2.js'
  },
  output: {
    path: __dirname + '/build/',
    filename: '[name].bind.js',
    publicPath: '/build/',
   // chunkFilename: "[id].chunk.js"
    chunkFilename: "[chunkhash].chunk.js"
   // chunkFilename: "[hash].chunk.js"
  },
  module: {
    loaders:[
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      },{
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      },{
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=10000' //B单位<10kb base64
      },{
        test: /\html$/,
        loader: 'html-loader'
      },{
        test: /\.css$/,
        loader: 'style-loader!css-loader'  //默认全局global,不转换，加了css-loader?modules会变成默认局部 //通过 :local() :global() 决定 require() 返回一个map
        // loader: ExtractTextPlugin.extract('style-loader', 'css-loader')

      }
    ]
  },
  plugins: [
    new CommonsChunkPlugin('common.bind.js'),
    //new CommonsChunkPlugin('autoFlash.bind.js',['webpack/hot/dev-server', 'webpack-dev-server/client?http://localhost:8080']),
    //new CommonsChunkPlugin("pageCommons.js", ["page1", "page2"]),

    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './ftl/index.ftl'// Load a custom template
    }),
    new OpenBrowserPlugin({
      url: 'http://localhost:8080/build/'
    }),


  /*  new uglifyJsPlugin({  // --optimize-minimize
      compress: {
        warnings: false
      }
    })*/
      // new ExtractTextPlugin('styles.css')
  ],
  externals: {
    //'jquery': 'jQuery'  //require("jquery") => 取全局的jQuery变量
  },
  resolve: {
    //extensions: ['', '.js', '.json', '.coffee'] // require('file') 代替 require('file.coffee')
  },

  devtool: "#source-map"  // --devtool sourcemap   当同时设置同一个，命令行优先，否则命令行+配置一起的结果
};
