const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = merge(baseConfig, {
  // 将entry指向应用程序的server entry文件
  entry: './src/entry-server.js',
  target: 'node',
  devtool: 'source-map',
  // 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    alias: {
      'create-api': './create-api-server.js'
    }
  },
  externals: nodeExternals({
    whitelist: /\.css$/
  }),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueSSRServerPlugin(),
    new ExtractTextPlugin({
      filename: 'css/[name].css',
      allChunks: true,
    })
  ]
})