import { combineReducers } from 'redux'
import userDetails from './reducer_userDetails.js'
import changeTitle from './reducer_changeTitle.js'

const rootReducer = combineReducers({
  userDetails
  changeTitle,
})

export default rootReducer
