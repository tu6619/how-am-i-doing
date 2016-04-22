import { combineReducers } from 'redux'
import userDetails from './reducer_userDetails.js'
import toggleMenu from './reducer_toggleMenu.js'
import changeTitle from './reducer_changeTitle.js'

const rootReducer = combineReducers({
  userDetails
  toggleMenu,
  changeTitle,
})

export default rootReducer
