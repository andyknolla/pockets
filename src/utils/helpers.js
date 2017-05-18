import axios from 'axios';

// function getListings() {
//   return axios.get('http://clientside-api.herokuapp.com/api/v1/listings/')
// }

const config = {
  headers: { 'Authorization': 'b4caaa6dc0bac64f536fea340c5f8d29'}
}
const helpers = {
  fetchListings: function() {
    return axios.get('http://clientside-api.herokuapp.com/api/v1/listings/', config)
    .then(function(data) {
      return {
        data: data
      }
    })
  }
}

export default helpers;
