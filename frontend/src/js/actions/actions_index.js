// change these consts
export const GET_USER_DETAILS = 'GET_USER_DETAILS'
export const CHANGE_TITLE = 'CHANGE_TITLE'
export const TOGGLE_MENU = 'TOGGLE_MENU'
export const CHANGE_VIZ_TYPE = 'CHANGE_VIZ_TYPE'

export const getUserDetails = () => {
  return {
    type: GET_USER_DETAILS,
    payload: 'some user details'
  }
}

export const changeTitle = () => {
  return {
    type: CHANGE_TITLE,
    payload: 'FAC7 Boiler Plate got Reduxed!'
  }
}

export const toggleMenu = () => {
  return {
    type: TOGGLE_MENU
  }
}

export const changeVizType = (vizType) => {
  return {
    type: CHANGE_VIZ_TYPE,
    vizType
  }
}
