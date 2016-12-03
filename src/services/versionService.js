import baseService from './baseService'

const url = 'https://sportlinks-997d1.firebaseapp.com/version.json'
let cancel

export default function getVersion() {
  let service = baseService(url, cancel)
  cancel = service.cancel
  return service.result
}
