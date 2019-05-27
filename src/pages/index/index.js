import './index.styl'
// import obj from '@assets/js/common.js'
// import { testMain } from '@/main'
import { testTool } from '@lib/tools.js'
import $ from 'jquery'
console.log(1)
const abc = {
  a: 1
}
testTool()
// testMain()
// console.log(obj.name)
const bbb = Object.keys(abc).filter(v => true)
console.log(bbb)
$('body').append('<div>sbbbbb<div>')
