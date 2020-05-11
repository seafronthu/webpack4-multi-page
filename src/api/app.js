import { ajax } from '@lib/http'
function submitContactInfo (data) {
  return ajax.post({
    url: 'concat',
    data
  })
}
export { submitContactInfo }
