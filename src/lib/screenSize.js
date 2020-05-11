function screenSize () {
  var html = document.documentElement || document.querySelector('html')
  var clinetWidth = document.documentElement.clientWidth || document.body.clientWidth
  // let clinetHeight = document.documentElement.clientHeight || document.body.clientHeight
  clinetWidth = clinetWidth > 750 ? 750 : clinetWidth
  html.style.fontSize = clinetWidth / 7.5 + 'px'
}
export { screenSize }
