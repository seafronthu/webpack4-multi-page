
// startPlace是起始位置；
// endPlace是目标位置；
// rate是缓动速率；
// callback是变化的位置回调，支持两个参数，value和isEnding，表示当前的位置值（数值）以及是否动画结束了（布尔值）
// const animate = {
//   easeOut (startPlace, endPlace, rate, callback = () => {}) {
//     if (startPlace === endPlace || typeof startPlace !== 'number') {
//       return
//     }
//     let start = startPlace
//     let end = endPlace || 0
//     rate = rate || 2
//     let step = function () {
//       start = start - (start - end) / rate
//       if (Math.abs(start - endPlace) < 0.5) {
//         callback(endPlace, true)
//         return
//       }
//       callback(start, false)
//       requestAnimationFra(step)
//     }
//     step()
//   },
//   clear () {

//   }
// }
class Animate {
  constructor () {
    // 不能放在该对象下面 否则会报uncaught TypeError: Illegal invocation
    window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || (fn => setTimeout(fn, 17))
    window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || clearTimeout
  }
  easeOut (startPlace, endPlace, rate, callback = () => {}) {
    if (startPlace === endPlace || typeof startPlace !== 'number') {
      return
    }
    let start = startPlace
    let end = endPlace || 0
    rate = rate || 2
    let that = this
    let step = function () {
      start = start - (start - end) / rate
      if (Math.abs(start - endPlace) < 0.5) {
        callback(endPlace, true)
        return
      }
      callback(start, false)
      that.timer = window.requestAnimationFrame(step)
    }
    step()
  }
  clear () {
    if (this.timer) {
      window.cancelAnimationFrame(this.timer)
      this.timer = null
    }
  }
}
// let requestAnimationFra = fn => setTimeout(fn, 1000)

export { Animate }
// 84.64262026460288 88 0.33573797353971174
