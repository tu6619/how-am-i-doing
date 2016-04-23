import { CHANGE_VIZ_TYPE } from '../actions/actions_index.js'

export default (state = { vizType: 'bar' }, action) => {
  switch (action.type) {
  case CHANGE_VIZ_TYPE :
    return { ...state, vizType: action.vizType }
  default :
    return state
  }
}
