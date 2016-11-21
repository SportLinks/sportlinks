import baseService from './baseService';

const url = 'https://sportlinks-997d1.firebaseapp.com/version.json';

export default function(cancel) {
  return baseService(url, cancel);
}
