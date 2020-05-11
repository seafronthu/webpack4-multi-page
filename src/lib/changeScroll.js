import { eventThrottle, getParentsOffsetTop } from './tools'
import { Animate } from './animate'
class ChangeScroll {
  /**
   * @param {*} idEle 滚动的dom
   * @param {*} clickClsEle 点击的dom
   * @param {*} controlClsEle 被控制的dom
   * @param {*} lazyEle 懒加载dom
   * @param {*} callback 回调
   */
  constructor ({ idEle, clickClsEle, controlClsEle, lazyEle, lazyType, lazyOffset = 0, scrollTop = 0, scrollBottom = 0, controlDone = () => {}, lazyDone }) {
    // 标准中顶部滚动是document.documentElement.scrollTop 非标准document.body.scrollTop 以下有兼容赋值等写法
    this.w = idEle ? document.querySelector(idEle) : window
    this.idEle = idEle ? document.querySelector(idEle) : null
    this.clickClsEle = clickClsEle
    this.scrollTop = scrollTop
    this.scrollBottom = scrollBottom
    this.controlClsEle = controlClsEle
    this.lazyEle = lazyEle
    this.lazyOffset = lazyOffset
    this.lazyType = lazyType // data-src
    this.lazyDone = lazyDone // data-src
    this.controlDone = controlDone
    this.clickClsEleArr = []
    this.scrollFunc = eventThrottle({ callback: this.scrollDeal.bind(this), time: 200 })
    this.w.addEventListener('scroll', this.scrollFunc)
    this.w.scroll((document.documentElement.scrollLeft || document.body.scrollLeft) + 1, (document.documentElement.scrollTop || document.body.scrollTop) + 1) // 偏移+1 防止变成0的时候不触发
    this.srollDomFunc()
  }
  // dom处理与记录
  srollDomFunc () {
    const {
      clickClsEle,
      controlClsEle,
      scrollTop,
      scrollBottom,
      idEle
    } = this
    let animate = new Animate()
    for (let i = 0; i < document.querySelectorAll(clickClsEle).length; ++i) {
      let ele = document.querySelectorAll(clickClsEle)[i]
      let sign = ele.getAttribute('data-sign')
      let clickEle = ele
      let controlEle = document.querySelector(`${controlClsEle}[data-sign="${sign}"]`)
      ele.onclick = (e) => {
        let top = getParentsOffsetTop(controlEle, idEle) - scrollTop + scrollBottom
        top = top < 0 ? 0 : top
        // let height = controlEle.offsetHeight
        let clientHeight = document.documentElement.clientHeight || document.body.clientHeight
        let scrollHeight = idEle ? idEle.scrollHeight : document.documentElement.scrollHeight || document.body.scrollHeight
        let bottomScrollTop = scrollHeight - clientHeight
        let originScroll = top > bottomScrollTop ? bottomScrollTop : top // 当offsetTop 超出到底部scrollTop的时候以实际只能滚动底部的scrollTop距离
        // if (typeof window.getComputedStyle(document.body).scrollBehavior === void 0) {
        //   // 传统的JS平滑滚动处理代码...
        // }
        originScroll = originScroll || 0
        animate.clear()
        animate.easeOut(idEle ? idEle.scrollTop : document.documentElement.scrollTop || document.body.scrollTop, originScroll, 10, function (val) {
          if (idEle) {
            idEle.scrollTop = val
          } else {
            document.body.scrollTop = val
            document.documentElement.scrollTop = val
          }
        })
      }
      this.clickClsEleArr.push({
        clickEle,
        controlEle
      })
    }
  }
  scrollDeal (e) {
    const { lazyEle, lazyOffset, idEle, lazyType, lazyDone } = this
    const clientHeight = idEle ? idEle.clientHeight : document.documentElement.clientHeight || document.body.clientHeight
    // const scrollHeight = idEle.scrollHeight
    const scrollTop = idEle ? idEle.scrollTop : document.documentElement.scrollTop || document.body.scrollTop
    let lazyDoms = document.querySelectorAll(lazyEle)
    for (let i = 0; i < lazyDoms.length; ++i) {
      let ele = lazyDoms[i]
      let exit = ele.getAttribute('data-exit') // 标记dom是否已经加载过
      if (exit) {
        continue
      }
      let offsetTop = getParentsOffsetTop(ele, idEle)
      let offsetHeight = ele.offsetHeight
      // dom是否在可视区范围内
      // console.log(offsetTop, scrollTop, scrollTop + clientHeight)
      if (offsetTop + offsetHeight + lazyOffset >= scrollTop && scrollTop + clientHeight >= offsetTop - lazyOffset) {
        if (lazyDone) { // 是否有回调方法
          lazyDone({ ele, offsetTop })
          continue
        }
        let src = ele.getAttribute(lazyType)
        if (ele.tagName.toLocaleLowerCase() === 'img') {
          ele.src = src
        } else {
          ele.style.backgroundImage = `url(${src})`
        }
        ele.setAttribute('data-exit', true)
      }
    }
    for (let i = 0; i < document.querySelectorAll(lazyEle).length; i++) {
      let ele = document.querySelectorAll(lazyEle)[i]
      let top = getParentsOffsetTop(ele, idEle)
      if (top - 2 * lazyOffset + clientHeight >= scrollTop && top - lazyOffset <= scrollTop) {
      }
    }
    this.clickClsEleArr.some(v => {
      let top = getParentsOffsetTop(v.controlEle, this.idEle)
      let height = v.controlEle.offsetHeight
      // console.log(v.top >= scrollHeight, clientHeight + scrollHeight > v.top)
      if (top >= scrollTop && (clientHeight + scrollTop > top)) {
        this.controlDone({ ...v, top, height, clientHeight, scrollTop })
        return true
      }
      return false
    })
  }
  clearScroll () {
    this.w.removeEventListener('scroll', this.scrollFunc)
  }
}
export default ChangeScroll
