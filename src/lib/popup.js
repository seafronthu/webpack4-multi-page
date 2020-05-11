// let zIndex = 1000
// let cfmClass = 'popup-confirm'
// let mskClass = 'popup-mask'
// let popupArr = []
// function popup ({ type, message, description, mask, maskClose, close, popupClass, maskClass }) {

// }
// // 合并样式
// function mergeClass (initCls, optCls) {
//   let arr = [initCls]
//   if (typeof optCls === 'string') {
//     arr.push(optCls)
//   } else if (Object.prototype.toString.call(optCls) === '[object Array]') {
//     arr = arr.concat(optCls)
//   }
//   return arr.join(' ')
// }
// // 创建弹窗
// function createPopup () {
//   let container = `<div class="${classes}">
//                       <div></div>
//                       </div>`
//   return container
// }
// // 创建遮罩层
// function createMask () {
//   let mask = `<div class="popup-mask"></div>`
//   return mask
// }
// // 移除当前弹窗
// function removePopup () {

// }
// // 关闭弹窗
// function closePopup () {

// }
// ['success', 'warning', 'info', 'error', 'clearAll', 'close'].forEach(item => {
//   popup[item] = (options) => {
//     let opt = {}
//     if (typeof options === 'object') {
//       opt = {
//         type: item,
//         ...options
//       }
//     } else {
//       opt = {
//         type: item,
//         message: options
//       }
//     }
//     popup(opt)
//   }
// })
// export default popup
