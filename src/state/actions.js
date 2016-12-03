/* global firebase:true */

import {getShows} from '../services/showsService'
import getVersion from '../services/versionService'

export const SET_STATE = 'SET_STATE'
export const TOGGLE_MENU = 'TOGGLE_MENU'
export const HIDE_MENU ='HIDE_MENU'
export const FETCH_SHOWS_REQUEST = 'FETCH_SHOWS_REQUEST'
export const FETCH_SHOWS_SUCCESS = 'FETCH_SHOWS_SUCCESS'
export const FETCH_VERSION_REQUEST = 'FETCH_VERSION_REQUEST'
export const FETCH_VERSION_SUCCESS = 'FETCH_VERSION_SUCCESS'
export const CLOSE_DIALOG = 'CLOSE_DIALOG'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export function toggleMenuAction() {
  return {
    type: TOGGLE_MENU
  }
}

export function hideMenuAction() {
  return {
    type: HIDE_MENU
  }
}

export function requestShowsAction(sourceId) {
  return {
    type: FETCH_SHOWS_REQUEST,
    state: {
      shows: {
        loading: true,
        sourceId: sourceId,
        list: [],
        receivedAt: undefined
      }
    }
  }
}

export function receiveShowsAction(sourceId, shows) {
  return {
    type: FETCH_SHOWS_SUCCESS,
    state: {
      shows: {
        loading: false,
        sourceId: sourceId,
        list: shows,
        receivedAt: Date.now()
      }
    }
  }
}

export function fetchShowsAction(sourceId) {
  return dispatch => {
    dispatch(requestShowsAction(sourceId))
    return getShows(sourceId)
    .then(response => {
      dispatch(receiveShowsAction(sourceId, response.data))}
    )
  }
}

export function requestVersionAction() {
  return {
    type: FETCH_VERSION_REQUEST,
    state: {
      dialog: {
        open: true,
        title: 'Information',
        text: 'Check new version...'
      }
    }
  }
}

export function receiveVersionAction(version, silentUpdate) {
  return {
    type: FETCH_VERSION_SUCCESS,
    state: {
      version: version,
      silentUpdate: silentUpdate
    }
  }
}

export function fetchVersionAction(silentUpdate) {
  return dispatch => {
    if (!silentUpdate) dispatch(requestVersionAction())
    return getVersion()
    .then(response => {
      dispatch(receiveVersionAction(response.data.version, silentUpdate))
    })
  }
}

export function closeDialogAction() {
  return {
    type: CLOSE_DIALOG,
    state: {
      dialog: {
        open: false,
        title: '',
        text: ''
      }
    }
  }
}

export function receiveLoginAction(login) {
  return {
    type: LOGIN,
    state: {
      user: {
        id: login.uid,
        name: login.name,
      }
    }
  }
}

export function userAuthAction() {
  return dispatch => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(receiveLoginAction({
          uid: user.uid,
          name: user.displayName
        }))
      }
    })
  }
}

export function receiveLogoutAction() {
  return {
    type: LOGOUT,
    state: {
      user: {
        id:  undefined,
        name: undefined
      }
    }
  }
}
