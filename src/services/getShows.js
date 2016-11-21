import baseService from './baseService';

let cancel;

export default function(url) {
  let service = baseService(url, cancel);
  cancel = service.cancel;
  return service.result;
}
