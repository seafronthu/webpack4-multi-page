const path = require('path')
const webpack = require('webpack')
const glob = require('glob')
// 消除冗余的css
const PurifycssWebpack = require('purifycss-webpack')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const rules = require('./rules.js')
const devEnv = process.env.NODE_ENV === 'development' // 开发环境
// 得到入口地址
function getEntrysFunc (pagePath, type = 'js') {
  // 兼容mac和windows // (\\/|\\\\)**(\\/|\\\\)*
  const globPath = `${pagePath}/**/*.${type}`
  const globArr = glob.sync(globPath)
  const entry = {}
  globArr.forEach(v => {
    entry[path.basename(v, `.${type}`)] = v
  })
  return entry
}
function getHtmlsFunc (fileObj, com) {
  const htmlWebpackPluginArr = []
  Object.keys(fileObj).forEach((name) => {
    htmlWebpackPluginArr.push(new HtmlWebpackPlugin({
      template: `./src/pages/${name}/${name}.html`,
      filename: `${name}.html`,
      inject: true,
      hash: true,
      chunks: [name, 'vender', ...Object.keys(com)],
      minify: devEnv ? false : {
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 压缩代码
        removeAttributeQuotes: true // 去除属性引用 (除了有空格的引用 所有的引号会去除)
      }
    }))
  })
  return htmlWebpackPluginArr
}
const common = getEntrysFunc(path.resolve('src/assets'))
const entry = { ...getEntrysFunc(path.resolve('src/pages')), ...common }
module.exports = {
  entry,
  module: { // 关于模块配置
    rules: [...rules] // 模块规则（配置 loader、解析器等选项）
  },
  resolve: {
    extensions: ['.js', '.json'], // 引用时可以不带后缀
    alias: {
      '@': path.join(__dirname, '..', 'src'),
      '@assets': path.join(__dirname, '..', 'src/assets'),
      '@lib': path.join(__dirname, '..', 'src/lib')
    }
  },
  externals: { // 不会从node_modules打包进去
    // 'jquery': 'jQuery'
  },
  optimization: { // https://webpack.docschina.org/plugins/split-chunks-plugin/
    splitChunks: {
      cacheGroups: {
        vender: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vender',
          priority: 10
        }
        // styles: {
        //   chunks: 'all', // initial表示提取入口文件的公共部分
        //   minChunks: 2, // 最少被几个chunk引用
        //   minSize: 0, // 表示提取公共部分最小的大小
        //   name: 'styles', // 提取出来的文件命名
        //   test: /\.(css|styl|stylus)$/, // 只提取公共css ，命名可改styles
        //   reuseExistingChunk: true,
        //   enforce: true
        // }
      }
    }
  },
  plugins: [ // 插件
    // 暴露全局变量
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    // 静态资源输出
    // new CopyWebpackPlugin([{
    //   from: path.resolve(__dirname, '../src/assets'),
    //   to: './assets',
    //   ignore: ['.*']
    // }]),
    // 消除冗余的css代码
    new PurifycssWebpack({
      paths: glob.sync(path.join(__dirname, '../src/pages/*/*.html'))
    }),
    ...getHtmlsFunc(getEntrysFunc(path.resolve('src/pages/')), common)
  ]
}
