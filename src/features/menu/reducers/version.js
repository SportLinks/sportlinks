import Immutable from 'immutable'
import getVersion from '../services/versionService'

export const FETCH_VERSION_REQUEST = 'FETCH_VERSION_REQUEST'
export const FETCH_VERSION_SUCCESS = 'FETCH_VERSION_SUCCESS'
export const CLOSE_DIALOG = 'CLOSE_DIALOG'

export const requestVersionAction = () =>
  ({
    type: FETCH_VERSION_REQUEST,
    state: {
      dialog: {
        open: true,
        title: 'Check for Update',
        text: 'Check new version...'
      }
    }
  })

export const receiveVersionAction = ({number='', silentUpdate=false} = {}) =>
  ({
    type: FETCH_VERSION_SUCCESS,
    state: {
      number,
      silentUpdate
    }
  })

export const fetchVersionAction = (silentUpdate) =>
  dispatch => {
    if (!silentUpdate) dispatch(requestVersionAction())
    return getVersion()
    .then(response => {
      dispatch(receiveVersionAction({number: response.data.version, silentUpdate: silentUpdate}))
    })
  }

export const closeDialogAction = () =>
  ({
    type: CLOSE_DIALOG,
    state: {
      dialog: {
        open: false,
        title: '',
        text: ''
      }
    }
  })

function updateVersion(state, newState) {
  if (!newState.silentUpdate) {
    let newVersion = (state.get('number') !== newState.number)
    let text = (newVersion) ? 'New version found :-)' : 'No updates found. You already have the latest version.'
    newState.dialog = {
      open: true,
      title: 'Check for Update',
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

const initialState = Immutable.fromJS({
  number: '0.1.0',
  silentUpdate: false,
  dialog: {
    open: false,
    title: '',
    text: '',
    hasToRefress: false
  }
})

export default function version(state = initialState, action) {
  switch (action.type) {
    case FETCH_VERSION_SUCCESS:
      return updateVersion(state, action.state)
    case FETCH_VERSION_REQUEST:
      return state.merge(action.state)
    case CLOSE_DIALOG:
      return closeDialog(state, action.state)
    default:
      return state
  }
}
