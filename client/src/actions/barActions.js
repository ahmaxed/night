import axios from 'axios';

export function updateSearch(info) {
  return dispatch => {
    return axios.put('/api/bars/lastSearch', info)
  }
}

export function addUser(info) {
  return dispatch => {
    return axios.put('/api/bars/addUser', info)
  }
}

export function removeUser(info) {
  return dispatch => {
    return axios.put('/api/bars/removeUser', info)
  }
}
