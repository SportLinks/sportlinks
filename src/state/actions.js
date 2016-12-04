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

export const toggleMenuAction = () => ({type: TOGGLE_MENU})

export const hideMenuAction = () => ({type: HIDE_MENU})

export const requestShowsAction = (sourceId) =>
  ({
    type: FETCH_SHOWS_REQUEST,
    state: {
      shows: {
        loading: true,
        sourceId: sourceId,
        list: [],
        receivedAt: undefined
      }
    }
  })

export const receiveShowsAction = ({sourceId, shows} = {}) =>
  ({
    type: FETCH_SHOWS_SUCCESS,
    state: {
      shows: {
        loading: false,
        sourceId: sourceId,
        list: shows,
        receivedAt: Date.now()
      }
    }
  })

export const fetchShowsAction = (sourceId) =>
  dispatch => {
    dispatch(requestShowsAction(sourceId))
    return getShows(sourceId)
    .then(response => {
      dispatch(receiveShowsAction({sourceId: sourceId, shows: response.data}))}
    )
  }

export const requestVersionAction = () =>
  ({
    type: FETCH_VERSION_REQUEST,
    state: {
      dialog: {
        open: true,
        title: 'Information',
        text: 'Check new version...'
      }
    }
  })

export const receiveVersionAction = ({version='', silentUpdate=false} = {}) =>
  ({
    type: FETCH_VERSION_SUCCESS,
    state: {
      version,
      silentUpdate
    }
  })

export const fetchVersionAction = (silentUpdate) =>
  dispatch => {
    if (!silentUpdate) dispatch(requestVersionAction())
    return getVersion()
    .then(response => {
      dispatch(receiveVersionAction({version: response.data.version, silentUpdate: silentUpdate}))
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

export const receiveLoginAction = ({uid=undefined, name=''} = {}) =>
  ({
    type: LOGIN,
    state: {
      user: {
        id: uid,
        name: name,
      }
    }
  })

export const userAuthAction = () =>
  dispatch => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(receiveLoginAction({
          uid: user.uid,
          name: user.displayName
        }))
      }
    })
  }

export const receiveLogoutAction = () =>
  ({
    type: LOGOUT,
    state: {
      user: {
        id:  undefined,
        name: undefined
      }
    }
  })
