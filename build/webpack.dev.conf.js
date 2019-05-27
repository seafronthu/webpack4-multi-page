const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackBaseConf = require('./webpack.base.conf')
const webpackConfigDev = {
  mode: 'development', // 研发环境
  output: {
    path: path.resolve(__dirname, '../dist'),
    // 打包多出口文件
    // 生成 a.bundle.js  b.bundle.js
    filename: './js/[name].bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, '../src'),
    publicPath: '/',
    host: '0.0.0.0',
    port: '8080',
    overlay: true, // 浏览器页面上显示错误
    open: true, // 开启浏览器
    // stats: "errors-only", //stats: "errors-only"表示只打印错误：
    hot: true // 开启热更新
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin() // 启动热更新
  ]
  // 通过在浏览器调试工具(browser devtools)中添加元信息(meta info)增强调试
  // 牺牲了构建速度的 `source-map' 是最详细的。
  // devtool: "source-map",
}
module.exports = merge(webpackBaseConf, webpackConfigDev) // 合并配置
