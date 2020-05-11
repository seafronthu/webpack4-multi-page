import '@assets/css/global.styl'
import '@assets/css/common.styl'
// 低版本浏览器支持，最低支持到IE8
// require('core-js/features/object/define-property')
// require('core-js/features/object/create')
// require('core-js/features/object/assign')
// require('core-js/features/array/for-each')
// require('core-js/features/array/index-of')
// // require('core-js/features/array/map')
// require('core-js/features/function/bind')
// require('core-js/features/promise');
(function () {
  // requestAnimationFrame cancelAnimationFrame 兼容设置
  var lastTime = 0
  var vendors = ['webkit', 'moz', 'ms', 'o']
  for (var xx = 0; xx < vendors.length && !window.requestAnimationFrame; ++xx) {
    window.requestAnimationFrame = window[vendors[xx] + 'RequestAnimationFrame']
    window.cancelAnimationFrame = window[vendors[xx] + 'CancelAnimationFrame'] ||
        window[vendors[xx] + 'CancelRequestAnimationFrame']
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (fn, element) {
      var currTime = new Date().getTime()
      var timeToCall = Math.max(0, 16.7 - (currTime - lastTime))
      var id = window.setTimeout(function () {
        fn(currTime + timeToCall)
      }, timeToCall)
      lastTime = currTime + timeToCall
      return id
    }
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id)
    }
  }
})();
(function () {
  if (window.HTMLElement) {
    let HTMLElement = window.HTMLElement
    // 使用原型扩展DOM自定义事件
    if (!window.addEventListener || !window.removeEventListener) {
      HTMLElement.prototype.addEventListener = function (type, fn, capture) {
        var el = this
        el.attachEvent('on' + type, function (e) {
          fn.call(el, e)
        })
      }
      HTMLElement.prototype.removeEventListener = function (type, fn, capture) {
        var el = this
        el.deattachEvent('on' + type, function (e) {
          fn.call(el, e)
        })
      }
    }
  } else {
    // 如果是不支持HTMLElement扩展的浏览器
    // 通过遍历所有元素扩展DOM事件

    if (!window.addEventListener || !window.removeEventListener) {
      var elAll = document.all; var lenAll = elAll.length
      for (var iAll = 0; iAll < lenAll; iAll += 1) {
        elAll[iAll].addEventListener = function (type, fn) {
          var el = this
          el.attachEvent('on' + type, function (e) {
            fn.call(el, e)
          })
        }
        elAll[iAll].removeEventListener = function (type, fn) {
          var el = this
          el.deattachEvent('on' + type, function (e) {
            fn.call(el, e)
          })
        }
      }
    }
  }
})();
(function () {
  if (!Function.prototype.bind) {
    // eslint-disable-next-line no-extend-native
    Function.prototype.bind = function (context, ...arg1) {
      let self = this
      return function (...arg2) {
        self.apply(context, ...arg1, ...arg2)
      }
    }
  }
})()
