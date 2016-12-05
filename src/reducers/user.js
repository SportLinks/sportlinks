import Immutable from 'immutable'
import {getUser} from '../services/authService'

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export const receiveLoginAction = ({uid=undefined, name=''} = {}) =>
  ({
    type: LOGIN,
    state: {
      id: uid,
      name: name,
    }
  })

export const userAuthAction = () =>
  dispatch => {
    getUser().then((user) => {
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
      id:  undefined,
      name: undefined
    }
  })

const initialState = Immutable.fromJS({
  id: undefined,
  name: undefined
})

export default function user(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
    case LOGOUT:
      return state.merge(action.state)
    default:
      return state
  }
}
