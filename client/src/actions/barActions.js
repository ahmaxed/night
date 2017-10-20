import axios from 'axios';
//import yelp from 'yelp-v3';


export function updateSearch(info) {
  return dispatch => {
    return axios.put('/api/bars/lastSearch', info)
  };
}



export function loadBars(location) {
  var config = {
    headers: {
      'Authorization': 'Bearer ' + process.env.REACT_APP_ACCESS_TOKEN
    },
    params:{
      location: location,
      term: "bars"
    },

  };

  //to help with the cross origin CORS error
  //var crossorigin = "https://cors-anywhere.herokuapp.com/";
  return dispatch => {
    return axios.get('https://cors-anywhere.herokuapp.com/'+'https://api.yelp.com/v3/businesses/search', config)
  };
}
