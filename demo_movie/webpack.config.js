module.exports = {
  entry: __dirname + "/src/app.js",
  output: {
    path: __dirname + "/dist",
    filename: 'bundle.js'
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: "./dist", //本地服务器所加载的页面所在的目录
    historyApiFallback: true, //不跳转
    inline: true //实时刷新
  }
}