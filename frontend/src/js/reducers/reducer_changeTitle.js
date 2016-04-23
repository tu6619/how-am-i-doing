import { CHANGE_TITLE } from '../actions/actions_index.js'

export default (state = {title: 'Hello Home!'}, action) => {
  switch (action.type) {
    case CHANGE_TITLE :
      return {...state, title: action.payload}
    default :
      return state
  }
}
