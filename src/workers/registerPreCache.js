export default function Register() {
  if ('serviceWorker' in navigator &&
     (window.location.protocol === 'https:' ||
      window.location.hostname === 'localhost' ||
      window.location.hostname.indexOf('127.') === 0)) {

    navigator.serviceWorker.register('service-worker.js', {scope: './'})
    .then(function(registration) {

      console.log('Cache webworker registration successful, scope is:', registration.scope);

      if (typeof registration.update === 'function') {
        registration.update();
      }

      registration.onupdatefound = function() {
        var installingWorker = registration.installing;
        installingWorker.onstatechange = function() {
          switch (installingWorker.state) {
            case 'installed':
              if (navigator.serviceWorker.controller) {
                console.log('New or updated content is available.');
              }
            break;

            case 'redundant':
              console.error('The installing service worker became redundant.');
            break;

            default:
            break
          }
        }
      }

      return navigator.serviceWorker.ready;

    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });

  }
}
