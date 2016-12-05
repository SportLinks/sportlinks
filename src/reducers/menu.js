import Immutable from 'immutable'

export const TOGGLE_MENU = 'TOGGLE_MENU'
export const HIDE_MENU ='HIDE_MENU'

export const toggleMenuAction = () => ({type: TOGGLE_MENU})
export const hideMenuAction = () => ({type: HIDE_MENU})

const toggleMenu = (state) => state.updateIn(['open'], value => !value)
const hideMenu = (state) => state.setIn(['open'], false)

const initialState = Immutable.fromJS({
  open: false
})

export default function menu(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MENU:
      return toggleMenu(state, action.state)
    case HIDE_MENU:
      return hideMenu(state)
    default:
      return state
  }
}
