
const href = window.location.href.split('index.html')[0]
const apiUrl = ~href.indexOf('play') ? href.split('play')[0] + 'play/index.php/' : 'https://play.hamorepage.com/index.php/'
const baseUrl = process.env.NODE_ENV === 'development' ? 'http://dev.hamorepage.com/play/index.php/' : apiUrl
function ajax ({ method = 'post', url, data, dataType = 'json', async = true }) {
  return new Promise((resolve, reject) => $.ajax({
    method,
    url: url.indexOf('http') === 0 || url.indexOf('/') === 0 ? url : baseUrl + url,
    data,
    dataType,
    async,
    success: resolve, // 成功后的回调函数
    error: reject// 失败后的回调函数
  }))
}
['get', 'post'].forEach(key => {
  ajax[key] = (options) => {
    return ajax({
      ...options,
      method: key
    })
  }
})
export { ajax }
