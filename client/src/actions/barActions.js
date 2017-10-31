import axios from 'axios';

import {LOAD_BARS, ADD_USER, REMOVE_USER} from './types';

export function loadBars(bars) {
  return {
    type: LOAD_BARS,
    bars
  };
}

export function add(bar, info) {
  return {
    type: ADD_USER,
    bar,
    info
  };
}

export function remove(bar, info) {
  return {
    type: REMOVE_USER,
    bar,
    info
  };
}

export function updateSearch(info) {
  return dispatch => {
    return axios.put('/api/bars/lastSearch', info).then(res => {
      const bars = res.data;
      dispatch(loadBars(bars));
    });
  }
}

export function addUser(info) {
  return dispatch => {
    return axios.put('/api/bars/addUser', info).then(res => {
      const bar = res.data;
      dispatch(add(bar, info));
    });
  }
}

export function removeUser(info) {
  return dispatch => {
    return axios.put('/api/bars/removeUser', info).then(res => {
      const bar = res.data;
      dispatch(remove(bar, info));
    });
  }
}
