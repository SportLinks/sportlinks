import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './index.css';
import registerServiceWorker from './utils/sw-registration';
import App from './App';
import SportLinks from './pages/SportLinks';
import Help from './pages/Help';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const routes = <Route component={App}>
  <Route path="/" component={SportLinks} />
  <Route path="/help" component={Help} />
</Route>;

ReactDOM.render(
  <Router history={browserHistory}>{routes}</Router>,
  document.getElementById('root')
);

registerServiceWorker();
