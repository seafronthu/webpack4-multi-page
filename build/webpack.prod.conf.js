const path = require('path')
const merge = require('webpack-merge')
// 清除目录等
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin') // 压缩文件
var OptimizeCssAssetsWepackPlugin = require('optimize-css-assets-webpack-plugin')
// 4.x之后提取css
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpackBaseConf = require('./webpack.base.conf')
const webpackConfigProd = {
  mode: 'production', // 生产环境
  output: {
    path: path.resolve(__dirname, '../dist'),
    // 打包多个出口文件
    filename: 'js/[name].[chunkhash:8].js', // chunkhash 文件级的更新 hash所有文件的更新
    publicPath: './'
  },
  devtool: 'none',
  externals: {
    jquery: 'jQuery'
  },
  plugins: [
    // 清除文件
    new CleanWebpackPlugin({
      verbose: true, // 开启在控制台输出信息
      dry: false // false 删除文件  true 不删
    }),
    // CSS样式抽离
    new MiniCssExtractPlugin({ //
      filename: 'css/[name].[contenthash:8].min.css'
    }),
    // 解决css重复问题
    new OptimizeCssAssetsWepackPlugin(
      // { assetNameRegExp: /\.css$/g, // 一个正则表达式，指示应优化\最小化的资产的名称。提供的正则表达式针对配置中ExtractTextPlugin实例导出的文件的文件名运行，而不是源CSS文件的文件名。默认为/\.css$/g
      //   cssProcessor: require('cssnano'), // 用于优化\最小化CSS的CSS处理器，默认为cssnano。这应该是一个跟随cssnano.process接口的函数（接收CSS和选项参数并返回一个Promise）。
      //   cssProcessorOptions: { safe: true, discardComments: { removeAll: true } }, // 传递给cssProcessor的选项，默认为{}
      //   canPrint: true // 一个布尔值，指示插件是否可以将消息打印到控制台，默认为true
      // }
    ),
    new UglifyjsWebpackPlugin({
      uglifyOptions: {
        // display warnings when dropping unreachable code or unused declarations etc.
        warnings: false,
        ie8: true,
        compress: {
          drop_debugger: false // (default: true) -- remove debugger; statements
          // -- Pass true to discard calls to console.* functions. If you wish to drop a specific function call such as console.info and/or retain side effects from function arguments after dropping the function call then use pure_funcs instead
          // drop_console: true
        }
      }
    })
  ],
  module: {
    rules: []
  }

}

if (process.env.npm_config_report) { // 打包后模块大小分析//npm run build --report
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfigProd.plugins.push(new BundleAnalyzerPlugin())
}
module.exports = merge(webpackBaseConf, webpackConfigProd) // 合并配置
