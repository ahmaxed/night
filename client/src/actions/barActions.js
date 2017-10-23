import axios from 'axios';
//import yelp from 'yelp-v3';


export function updateSearch(info) {
  return dispatch => {
    return axios.put('/api/bars/lastSearch', info)
  };
}
