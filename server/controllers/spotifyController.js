const axios = require('axios');
const { response } = require('express');
const express = require('express');
require('dotenv').config();

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_SECRET;

const app = express();

const serialize = function (obj) {
  var str = [];
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  }
  return str.join('&');
};

let spotify_access_token = '';
exports.getSpotifyToken = () => {
  const promise = axios.post(
    'https://accounts.spotify.com/api/token',
    serialize({
      grant_type: 'client_credentials',
    }),
    {
      headers: {
        Authorization: 'Basic ' + btoa(client_id + ':' + client_secret),
      },
    }
  );

  access_token = promise.then((response) => response.data.access_token);
  access_token.then((response) => {
    spotify_access_token = response;
  });
};

exports.getTrack = (req, res) => {
  const trackToGet = req.query.track;
  axios
    .get(`https://api.spotify.com/v1/tracks/${trackToGet}`, {
      headers: { Authorization: 'Bearer ' + spotify_access_token },
    })
    .then((response) => {
      res.send(response.data);
    });
};

exports.getFeaturedPlaylists = (req, res) => {
  axios
    .get(`https://api.spotify.com/v1/browse/featured-playlists`, {
      headers: { Authorization: 'Bearer ' + spotify_access_token },
    })
    .then((response) => {
      res.send(response.data);
    });
};
