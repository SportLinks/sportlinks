import {combineReducers} from 'redux-immutable';
import menu from '../features/menu/reducers/menu'
import shows from '../features/shows/reducers/shows'
import user from '../features/login/reducers/user'
import version from '../features/menu/reducers/version'

export default combineReducers({
  menu,
  shows,
  user,
  version
})
