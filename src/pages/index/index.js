import './index.styl'
import ChangeScroll from '@lib/changeScroll'
import { submitContactInfo } from '@api'
for (let i = 0; i < document.querySelectorAll('img').length; ++i) {
  let ele = document.querySelectorAll('img')[i]
  ele.ondragstart = () => false
}
$(function () {
  // 滚动操作
  new ChangeScroll({
    clickClsEle: '.index-anchor-point-click',
    controlClsEle: '.index-menu-block',
    scrollTop: 71,
    controlDone (obj) {
    },
    lazyEle: '.index-lazy-img',
    lazyType: 'data-src',
    lazyOffset: 400
  })

  new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    loop: true,
    autoplay: 3000,
    grabCursor: true,
    paginationClickable: true
  })
  // $('.arrow-left').on('click', function(e){
  //   e.preventDefault()
  //   mySwiper.swipePrev()
  // })
  // $('.arrow-right').on('click', function(e){
  //   e.preventDefault()
  //   mySwiper.swipeNext()
  // })

  // 轮播操作
  // new Swiper('.swiper-container', {
  //   // direction: 'vertical', // 垂直切换选项
  //   pagination: {
  //     el: '.swiper-pagination'
  //   },
  //   // autoplay: {
  //   //   delay: 3000 // 3秒切换一次
  //   // },
  //   loop: true, // 循环模式选项
  //   disableOnInteraction: false
  //   // 如果需要分页器
  //   // pagination: {
  //   //   el: '.swiper-pagination'
  //   // }
  // })
  // 显示二维码
  $('.show-code-hover').hover(function () {
    let jqDomArr = $(this).find('.index-icon-container')
    jqDomArr.eq(0).hide()
    jqDomArr.eq(1).stop().css('opacity', 1).fadeIn()
  }, function () {
    let jqDomArr = $(this).find('.index-icon-container')
    jqDomArr.eq(0).stop().css('opacity', 1).fadeIn()
    jqDomArr.eq(1).hide()
  })
  // 如果需要前进后退按钮
  // navigation: {
  //   nextEl: '.swiper-button-next',
  //   prevEl: '.swiper-button-prev',
  // },

  // // 如果需要滚动条
  // scrollbar: {
  //   el: '.swiper-scrollbar'
  // }
  function setLock () {
    setTimeout(function () {
      lock = true
    }, 400)
  }
  var lock = true
  $('body').click(function () {
    if ($('#contact-us-form').is(':visible') && lock) {
      $('#contact-us-form').fadeOut()
      $('#contact-us-btn').text('联系我们')
    }
  })
  $('.index-input-button-container').click(function (e) {
    return false
  })
  // 输入
  $('.form-input').keydown(function (e) {
    let form = $(this).attr('data-form')
    if (e.key === 'Enter') {
      $(`.input-button[data-form="${form}"]`).click()
    }
  })
  $('.form-input').focus(function () {
    let form = $(this).attr('data-form')
    $(`.input-button[data-form="${form}"]`).css({
      'box-shadow': '0 0 10px 1px rgba(255,255,255,1)'
    })
  })
  $('.form-input').blur(function () {
    let form = $(this).attr('data-form')
    $(`.input-button[data-form="${form}"]`)[0].style.boxShadow = null
  })
  $('.input-button').click(function () {
    if (this.id === 'contact-us-btn' && $('#contact-us-form').is(':hidden')) {
      $('#contact-us-form').fadeIn()
      $(this).text('提交')
      return
    }
    let form = $(this).attr('data-form')
    let name = $(`.form-input[data-type="name"][data-form="${form}"]`)
    let phone = $(`.form-input[data-type="mobile_phone"][data-form="${form}"]`)
    if (name.val() === '') {
      lock = false
      layer.alert(`${name.attr('data-name')}不能为空`, { icon: 7, closeBtn: false }, function (index) {
        // do something
        setLock()
        layer.close(index)
      })
      return
    }
    if (!(/^1[3|4|5|7|8]\d{9}$/.test(phone.val()))) {
      lock = false
      layer.alert(`${phone.attr('data-name')}格式错误`, { icon: 7, closeBtn: false }, function (index) {
        // do something
        // do something
        setLock()
        layer.close(index)
      })
      return
    }
    submitContactInfo({
      name: name.val(),
      mobile_phone: phone.val(),
      from: '1'
    }).then(res => {
      if (res.ret === 1) {
        lock = false
        layer.alert('提交成功', { icon: 6, closeBtn: false }, function (index) {
          // do something
        // do something
          setLock()
          layer.close(index)
        })
      } else if (res.msg) {
        lock = false
        layer.alert(res.msg, { icon: 7, closeBtn: false }, function (index) {
          // do something
        // do something
          setLock()
          layer.close(index)
        })
      }
    })
  })
})
