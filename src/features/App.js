import React from 'react'
import {Router, Route, browserHistory} from 'react-router'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers/rootReducer'
import {SportLinksContainer} from './shows/showsListPage'
import HelpPage from './help/helpPage'
import LoginPage from './login/loginPage'
import NotificationPage from './notifications/notificationPage'
import {fetchShowsAction} from './shows/reducers/shows'
import {fetchVersionAction} from './menu/reducers/version'
import {userAuthAction} from './login/reducers/user'
import {hideMenuAction} from './menu/reducers/menu'
import {authUserListener, loginListener} from './login/services/authService'
import BaseRoute from './BaseRoute'

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

browserHistory.listen(location => {
  if (store.getState().getIn(['menu','open'])) {
    store.dispatch(hideMenuAction(location))
  }
})

export default React.createClass({
  render: function() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route component={BaseRoute}>
            <Route path="/" component={SportLinksContainer} />
            <Route path="/help" component={HelpPage} />
            <Route path="/notification" component={NotificationPage} onEnter={authUserListener}/>
            <Route path="/login" component={LoginPage} onEnter={loginListener}/>
          </Route>
        </Router>
      </Provider>
    )
  }
})
