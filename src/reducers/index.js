import {combineReducers} from 'redux-immutable';
import menu from './menu'
import shows from './shows'
import user from './user'
import version from './version'

export default combineReducers({
  menu,
  shows,
  user,
  version
})
