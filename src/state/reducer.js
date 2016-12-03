import {Map} from 'immutable'
import {SET_STATE,
        TOGGLE_MENU,
        HIDE_MENU,
        FETCH_SHOWS_REQUEST,
        FETCH_SHOWS_SUCCESS,
        FETCH_VERSION_REQUEST,
        FETCH_VERSION_SUCCESS,
        CLOSE_DIALOG,
        LOGIN,
        LOGOUT} from './actions'

function toggleMenu(state) {
  return state.updateIn(['menu', 'open'], value => !value)
}

function hideMenu(state) {
  return state.setIn(['menu', 'open'], false)
}

function updateVersion(state, newState) {
  if (!newState.silentUpdate) {
    let newVersion = (state.get('version') !== newState.version)
    let text = (newVersion) ? 'New version found :-)' : 'No new version found :-/'
    newState.dialog = {
      open: true,
      title: 'Information',
      text: text,
      hasToRefress: newVersion
    }
    newState.silentUpdate = false
  }
  return state.merge(newState)
}

function closeDialog(state, newState) {
  if (state.getIn(['dialog', 'hasToRefress'])) {
    window.location.reload()
    state.deleteIn(['dialog', 'hasToRefress'])
  }
  return state.merge(newState)
}

export default function(state = Map(), action) {
  switch (action.type) {
    case SET_STATE:
      return state.merge(action.state)
    case TOGGLE_MENU:
      return toggleMenu(state, action.state)
    case HIDE_MENU:
      return hideMenu(state)
    case FETCH_SHOWS_REQUEST:
      return state.merge(action.state)
    case FETCH_SHOWS_SUCCESS:
      return state.merge(action.state)
    case FETCH_VERSION_REQUEST:
      return state.merge(action.state)
    case FETCH_VERSION_SUCCESS:
      return updateVersion(state, action.state)
    case CLOSE_DIALOG:
      return closeDialog(state, action.state)
    case LOGIN:
      return state.merge(action.state)
    case LOGOUT:
      return state.merge(action.state)
    default:
      return state
  }
}
