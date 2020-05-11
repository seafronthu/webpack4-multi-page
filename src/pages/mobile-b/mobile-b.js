import './mobile-b.styl'
import { getWebType } from '@lib/tools'
import { screenSize } from '@lib/screenSize'
screenSize()
function morepagePhoneDown () {
  let webType = getWebType()
  let morepageshangjiaAndroidDown = 'http://download-hamorepage.oss-cn-hangzhou.aliyuncs.com/mct/1x/morepageshangjia_1_6_9_0.apk'
  let morepageshangjiaIOSDown = 'https://itunes.apple.com/cn/app/hai-pi-shang-jia/id1377936046?mt=8'
  $('.morepage-phone-down-mask').click(() => {
    $('.morepage-phone-down-mask').hide()
  })
  if (webType.isIOS) {
    $('.morepage-phone-down-button-ios').show()
    window.location.href = morepageshangjiaIOSDown
  } else if (webType.isAndroid) {
    $('.morepage-phone-down-button-android').show()
  } else if (webType.isWin || webType.isMac) {
    $('.morepage-phone-down-button-ios').show()
    $('.morepage-phone-down-button-android').show()
  }
  if (webType.isWx) {
    $('.morepage-phone-down-mask').show()
    $('.morepage-phone-down-button-ios').click(() => {
      $('.morepage-phone-down-mask').show()
    })
    $('.morepage-phone-down-button-android').click(() => {
      $('.morepage-phone-down-mask').show()
    })
    return
  }
  if (webType.isAndroid) {
    window.location.href = morepageshangjiaAndroidDown
  }
  $('.morepage-phone-down-button-ios').click(() => {
    window.location.href = morepageshangjiaIOSDown
  })
  $('.morepage-phone-down-button-android').click(() => {
    window.location.href = morepageshangjiaAndroidDown
  })
}
morepagePhoneDown()
