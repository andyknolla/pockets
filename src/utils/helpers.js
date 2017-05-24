import axios from 'axios';
import dotenv from 'dotenv';
import runtimeEnv from '@mars/heroku-js-runtime-env';
const env = runtimeEnv()
const config = {
  headers: { 'Authorization': env.REACT_APP_API_KEY}
}

const helpers = {
  fetchListings: function() {
    return axios.get('https://clientside-api.herokuapp.com/api/v1/listings/', config)
    .then(function(data) {
      return {
        data: data.data.data
      }
    })
  },

  fetchSingleListing: function(id) {
    return axios.get(`https://clientside-api.herokuapp.com/api/v1/listings/${id}`, config)
    .then(function(data) {
      return {
        data: data.data.data
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
