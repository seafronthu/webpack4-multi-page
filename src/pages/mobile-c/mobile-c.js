import '@/pages/mobile-b/mobile-b.styl'
import { screenSize } from '@lib/screenSize'
import { getWebType } from '@lib/tools'
screenSize()
function morepagePhoneDown () {
  let morepageshiguangAndroidDown = 'http://download-hamorepage.oss-cn-hangzhou.aliyuncs.com/happy/3x/morepageshiguang_3_3_5_3.apk'
  let morepageshiguangIOSDown = 'https://itunes.apple.com/cn/app/hai-pi-shi-guang/id1149185654?mt=8'
  let webType = getWebType()
  $('.morepage-phone-down-mask').click(() => {
    $('.morepage-phone-down-mask').hide()
  })
  if (webType.isIOS) {
    $('.morepage-phone-down-button-ios').show()
    window.location.href = morepageshiguangIOSDown
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
    window.location.href = morepageshiguangAndroidDown
  }
  $('.morepage-phone-down-button-ios').click(() => {
    window.location.href = morepageshiguangIOSDown
  })
  $('.morepage-phone-down-button-android').click(() => {
    window.location.href = morepageshiguangAndroidDown
  })
}
morepagePhoneDown()
