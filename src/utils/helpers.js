import axios from 'axios';

const config = {
  headers: { 'Authorization': 'b4caaa6dc0bac64f536fea340c5f8d29'}
}

const helpers = {
  fetchListings: function() {
    return axios.get('https://clientside-api.herokuapp.com/api/v1/listings/', config)
    .then(function(data) {
      return {
        data: data
      }
    })
  },

  fetchSingleListing: function(id) {
    return axios.get(`https://clientside-api.herokuapp.com/api/v1/listings/${id}`, config)
    .then(function(data) {
      return {
        data: data
      }
    })
  },

  createNewListing: function(name, url) {
    console.log('create new listing');
    let postData = {
      data: {
        attributes: {
          title: name,
          url: url
        }
      }
    }
    return axios.post('https://clientside-api.herokuapp.com/api/v1/listings/', postData, config)
  },

  deletePost: function(id) {
    return axios.delete(`https://clientside-api.herokuapp.com/api/v1/listings/${id}`, config)
  },

  editListing: function(id, name, url) {
    let postData = {
      data: {
        attributes: {
          title: name,
          url: url
        }
      }
    }
    return axios.put(`https://clientside-api.herokuapp.com/api/v1/listings/${id}`, postData, config)
  }
}

export default helpers;
