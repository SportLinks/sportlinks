import axios from 'axios';

const CancelToken = axios.CancelToken;
let source;

export default function(url) {
  if (source !== undefined) {
    source.cancel('currently operation canceled by the user.');
  }
  source = CancelToken.source();
  return axios.get(url, {
    cancelToken: source.token
  }).catch(function(error) {
    if (axios.isCancel(error)) {
      console.log('Request canceled', error.message);
    } else {
      console.log('Error: ' + error)
    }
  });
}
