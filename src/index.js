import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './index.css';
import registerServiceWorker from './utils/sw-registration';
import App from './App';
import SportLinks from './pages/SportLinks';
import Results from './pages/Results';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const routes = <Route component={App}>
  <Route path="/results" component={Results} />
  <Route path="/" component={SportLinks} />
</Route>;

ReactDOM.render(
  <Router history={hashHistory}>{routes}</Router>,
  document.getElementById('root')
);

registerServiceWorker();
