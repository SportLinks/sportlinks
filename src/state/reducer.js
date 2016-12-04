import Immutable from 'immutable'
import {TOGGLE_MENU,
        HIDE_MENU,
        FETCH_SHOWS_REQUEST,
        FETCH_SHOWS_SUCCESS,
        FETCH_VERSION_REQUEST,
        FETCH_VERSION_SUCCESS,
        CLOSE_DIALOG,
        LOGIN,
        LOGOUT} from './actions'

const initialState = Immutable.fromJS({
  shows: {
    loading: false,
    sourceId: '1',
    list: [],
    receivedAt: undefined
  },
  menu: {
    open: false
  },
  dialog: {
    open: false,
    title: '',
    text: '',
    hasToRefress: false
  },
  user: {
    id: undefined,
    name: undefined
  },
  navigation: {
    privatePage: undefined
  },
  version: '0.1.0',
  silentUpdate: false
})

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

export default function(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MENU:
      return toggleMenu(state, action.state)
    case HIDE_MENU:
      return hideMenu(state)
    case FETCH_VERSION_SUCCESS:
      return updateVersion(state, action.state)
    case CLOSE_DIALOG:
      return closeDialog(state, action.state)
    case FETCH_SHOWS_REQUEST:
    case FETCH_SHOWS_SUCCESS:
    case FETCH_VERSION_REQUEST:
    case LOGIN:
    case LOGOUT:
      return state.merge(action.state)
    default:
      return state
  }
}
