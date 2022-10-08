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

app.on('listening', function () {
  console.log('App is on');
});

const getSpotifyToken = () => {
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

  const access_token = promise.then((response) => response.data.access_token);
  return access_token;
};

exports.getTrack = (req, res) => {
  getSpotifyToken().then((data) => {
    axios
      .get('https://api.spotify.com/v1/tracks/11dFghVXANMlKmJXsNCbNl', {
        headers: { Authorization: 'Bearer ' + data },
      })
      .then((response) => {
        res.send(response.data);
      });
  });
};

exports.getFeaturedPlaylists = (req, res) => {
  getSpotifyToken().then((data) => {
    axios
      .get('https://api.spotify.com/v1/browse/featured-playlists', {
        headers: { Authorization: 'Bearer ' + data },
      })
      .then((response) => {
        res.send(response.data);
      });
  });
};
