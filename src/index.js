import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import registerServiceWorker from './utils/sw-registration';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

registerServiceWorker();

// Check for browser support of service worker
/*if ('serviceWorker' in navigator) {
 navigator.serviceWorker.register('service-worker.js')
 .then(function(registration) {
   // Successful registration
   console.log('Hooray. Registration successful, scope is:', registration.scope);
 }).catch(function(error) {
   // Failed registration, service worker won’t be installed
   console.log('Whoops. Service worker registration failed, error:', error);
 });
}*/
