import axios from 'axios'
// change these consts
export const GET_USER_DETAILS = 'GET_USER_DETAILS'
export const CHANGE_TITLE = 'CHANGE_TITLE'
export const TOGGLE_MENU = 'TOGGLE_MENU'

export const getUserDetails = () => {
  const details = axios.get('/user-request')
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

