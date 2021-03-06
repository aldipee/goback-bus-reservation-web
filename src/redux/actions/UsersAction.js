import axios from 'axios'
import { SET_LOADING_USERS, GET_ALL_USERS, GET_USER_BY_ID, ERROR_USERS, SET_LOGOUT } from '../actions/types'
import config from '../../utils/config'
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token_user')}`

export const getUserById = (id) => async (dispatch) => {
  try {
    setLoading()
    const token = `Bearer ${localStorage.getItem('token_user')}`
    const res = await axios.get(config.DATA_URL.concat(`users/profile/${id}`), {
      headers: { Authorization: `${token}` }
    })
    dispatch({
      type: GET_USER_BY_ID,
      payload: {
        userProfile: res.data.profileData,
        userReservations: res.data.reservationsData
      }
    })
  } catch (error) {
    dispatch({
      type: ERROR_USERS,
      payload: error.response
    })
  }
}

export const getAllUsers = (query) => async (dispatch) => {
  try {
    setLoading()
    query = (query && `users/${query}`) || 'users?limit=5'
    const token = `Bearer ${localStorage.getItem('token_user')}`
    const res = await axios.get(config.DATA_URL.concat(query), {
      headers: { Authorization: `${token}` }
    })
    dispatch({
      type: GET_ALL_USERS,
      payload: {
        data: res.data.data,
        pageInfo: res.data.pageInfo
      }
    })
  } catch (error) {
    console.log(error)
    dispatch({
      type: ERROR_USERS,
      payload: error
    })
  }
}

export const setLogout = () => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOGOUT
    })
  } catch (error) {
    console.log(error)
  }
}

export const setLoading = () => {
  return {
    type: SET_LOADING_USERS
  }
}
