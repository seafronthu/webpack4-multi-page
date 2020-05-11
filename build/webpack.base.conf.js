const path = require('path')
const webpack = require('webpack')
const glob = require('glob')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin') // build speed
const smp = new SpeedMeasurePlugin()
// 消除冗余的css
// const PurifycssWebpack = require('purifycss-webpack') // 谨慎使用 它会把html上不出现的css全部干掉
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin') // 很重要的插件生成多页面入口
const rules = require('./rules.js')
// console.log(path.resolve())
// console.log(path.join())
// console.log(__dirname)
const devEnv = process.env.NODE_ENV === 'development' // 开发环境
// 得到入口地址
function getEntrysFunc (pagePath, type = 'js') {
  // 兼容mac和windows // (\\/|\\\\)**(\\/|\\\\)*
  const globPath = `${pagePath}/**/*.${type}`
  const globArr = glob.sync(globPath)
  const entry = {}
  globArr.forEach((v) => {
    entry[path.basename(v, `.${type}`)] = v
  })
  return entry
}
function getHtmlsFunc (fileObj, com) {
  const htmlWebpackPluginArr = []
  Object.keys(fileObj).forEach((name) => {
    htmlWebpackPluginArr.push(
      new HtmlWebpackPlugin({
        template: `./src/pages/${name}/${name}.html`,
        filename: `${name}.html`,
        favicon: path.resolve(
          __dirname,
          `../src/assets/img/favicon-128×128.ico`
        ),
        // favicon: `./src/pages/${name}/favicon.ico`,
        inject: true,
        hash: true,
        chunks: ['main', name, 'vender', ...Object.keys(com)],
        minify: devEnv
          ? false
          : {
            removeComments: true, // 移除HTML中的注释
            collapseWhitespace: true, // 压缩代码
            removeAttributeQuotes: true // 去除属性引用 (除了有空格的引用 所有的引号会去除)
          }
      })
    )
  })
  return htmlWebpackPluginArr
}
const common = getEntrysFunc(path.resolve('src/assets'))
const entry = {
  main: path.resolve('src/main.js'),
  ...getEntrysFunc(path.resolve('src/pages')),
  ...common
}
module.exports = smp.wrap({
  entry,
  module: {
    // 关于模块配置
    rules: [...rules] // 模块规则（配置 loader、解析器等选项）
  },
  resolve: {
    extensions: ['.js', '.json'], // 引用时可以不带后缀
    alias: {
      '@': path.join(__dirname, '..', 'src'),
      '@assets': path.join(__dirname, '..', 'src/assets'),
      '@lib': path.join(__dirname, '..', 'src/lib'),
      '@api': path.join(__dirname, '..', 'src/api')
    }
  },
  externals: {
    // 不会从node_modules打包进去
    // 'jquery': 'jQuery'
  },
  optimization: {
    // https://webpack.docschina.org/plugins/split-chunks-plugin/
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
  stats: {
    // 未定义选项时，stats 选项的备用值(fallback value)（优先级高于 webpack 本地默认值）
    all: undefined,

    // 添加资源信息
    assets: true,

    // 对资源按指定的字段进行排序
    // 你可以使用 `!field` 来反转排序。
    assetsSort: 'field',

    // 添加构建日期和构建时间信息
    builtAt: true,

    // 添加缓存（但未构建）模块的信息
    cached: true,

    // 显示缓存的资源（将其设置为 `false` 则仅显示输出的文件）
    cachedAssets: true,

    // 添加 children 信息
    children: false,

    // 添加 chunk 信息（设置为 `false` 能允许较少的冗长输出）
    chunks: false,

    // 将构建模块信息添加到 chunk 信息
    chunkModules: false,

    // 添加 chunk 和 chunk merge 来源的信息
    chunkOrigins: false,

    // 按指定的字段，对 chunk 进行排序
    // 你可以使用 `!field` 来反转排序。默认是按照 `id` 排序。
    chunksSort: 'field',

    // 用于缩短 request 的上下文目录
    // context: '../src/',

    // `webpack --colors` 等同于
    colors: true,

    // 显示每个模块到入口起点的距离(distance)
    depth: false,

    // 通过对应的 bundle 显示入口起点
    entrypoints: false,

    // 添加 --env information
    env: false,

    // 添加错误信息
    errors: true,

    // 添加错误的详细信息（就像解析日志一样）
    errorDetails: true,

    // 将资源显示在 stats 中的情况排除
    // 这可以通过 String, RegExp, 获取 assetName 的函数来实现
    // 并返回一个布尔值或如下所述的数组。
    // excludeAssets: (assetName) => { console.log(assetName, 1); return true }, // 'filter' | /filter/ | (assetName) => ... return true|false |
    //   ['filter'] | [/filter/] | [(assetName) => ... return true|false],

    // // 将模块显示在 stats 中的情况排除
    // // 这可以通过 String, RegExp, 获取 moduleSource 的函数来实现
    // // 并返回一个布尔值或如下所述的数组。
    // excludeModules: (moduleSource) => { console.log(moduleSource, 2); return true }, // 'filter' | /filter/ | (moduleSource) => ... return true|false |
    //   ['filter'] | [/filter/] | [(moduleSource) => ... return true|false],

    // // 和 excludeModules 相同
    // exclude: 'filter' | /filter/ | (moduleSource) => ... return true|false |
    //   ['filter'] | [/filter/] | [(moduleSource) => ... return true|false],

    // 过滤警告显示（从 webpack 2.4.0 开始），
    // 可以是 String, Regexp, 一个获取 warning 的函数
    // 并返回一个布尔值或上述组合的数组。第一个匹配到的为胜(First match wins.)。
    // warningsFilter: 'filter' | /filter/ | ['filter', /filter/] | (warning) => ... return true|false,
    // 添加 compilation 的哈希值
    hash: true,

    // 设置要显示的模块的最大数量
    maxModules: 15,

    // 添加构建模块信息
    modules: false,

    // 按指定的字段，对模块进行排序
    // 你可以使用 `!field` 来反转排序。默认是按照 `id` 排序。
    modulesSort: 'field',

    // 显示警告/错误的依赖和来源（从 webpack 2.5.0 开始）
    moduleTrace: true,

    // 当文件大小超过 `performance.maxAssetSize` 时显示性能提示
    performance: true,

    // 显示模块的导出
    providedExports: false,

    // 添加 public path 的信息
    publicPath: true,

    // 添加模块被引入的原因
    reasons: true,

    // 添加模块的源码
    source: true,

    // 添加时间信息
    timings: true,

    // 显示哪个模块导出被用到
    usedExports: false,

    // 添加 webpack 版本信息
    version: true,

    // 添加警告
    warnings: true
  },
  plugins: [
    // 插件
    // 进度展示
    new webpack.ProgressPlugin(function (percentage, message, ...args) {
      console.info(((percentage * 100) | 0) + '%') //, message, ...args)
    }),
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
    // new PurifycssWebpack({
    //   paths: glob.sync(path.join(__dirname, '../src/pages/*/*.html'))
    // }),
    ...getHtmlsFunc(getEntrysFunc(path.resolve('src/pages/')), common)
  ]
})
