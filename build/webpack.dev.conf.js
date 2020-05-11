const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin') // 优化日志
const webpackBaseConf = require('./webpack.base.conf')
const packageConfig = require('../package.json')
const createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
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
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    overlay: true, // 浏览器页面上显示错误
    // open: true // 开启浏览器
    // stats: "errors-only", //stats: "errors-only"表示只打印错误：
    // hot: true // 开启热更新
    quiet: true // FriendlyErrorsWebpackPlugin
  },
  plugins: [
    // 日志优化
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://localhost:8080`]
      },
      onErrors: createNotifierCallback()
    }),
    new webpack.HotModuleReplacementPlugin() // 启动热更新
  ]
  // 通过在浏览器调试工具(browser devtools)中添加元信息(meta info)增强调试
  // 牺牲了构建速度的 `source-map' 是最详细的。
  // devtool: "source-map",
}
module.exports = merge(webpackBaseConf, webpackConfigDev) // 合并配置
