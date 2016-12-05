import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, browserHistory} from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from './state/reducer'
import './index.css'
import App from './App'
import registerPreCacheServiceWorker from './workers/registerPreCache'
import registerWebPushServiceWorker from './workers/registerWebPush'
import {SportLinksContainer} from './pages/showsListPage'
import HelpPage from './pages/helpPage'
import LoginPage from './pages/loginPage'
import NotificationPage from './pages/notificationPage'
import {fetchShowsAction,
        fetchVersionAction,
        userAuthAction,
        hideMenuAction} from './state/actions'
import {authUserListener, loginListener} from './services/authService'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

const loggerMiddleware = createLogger({
  collapsed: true,
  stateTransformer: state => state.toJS()
})

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)

store.dispatch(fetchShowsAction('1'))
store.dispatch(fetchVersionAction(true))
store.dispatch(userAuthAction())

const routes = <Route component={App}>
  <Route path="/" component={SportLinksContainer} />
  <Route path="/help" component={HelpPage} />
  <Route path="/notification" component={NotificationPage} onEnter={authUserListener}/>
  <Route path="/login" component={LoginPage} onEnter={loginListener}/>
</Route>

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('root')
)

browserHistory.listen(location => {
  if (store.getState().getIn(['menu','open'])) {
    store.dispatch(hideMenuAction(location))
  }
})

registerPreCacheServiceWorker()
registerWebPushServiceWorker()
