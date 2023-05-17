import axios from 'axios';
import express, { Request, Response } from 'express';
import querystring from 'querystring';
import { config } from 'dotenv';
import MusicFacade from '../services/MusicFacade';

config();

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_SECRET;

const app = express();

const serialize = function (obj) {
  let str = [];
  for (let p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  }
  return str.join('&');
};

let spotify_access_token = '';

const musicFacade = new MusicFacade();
export const getSpotifyToken = async (res: Response) => {
  try {
    const response = await musicFacade.getSpotifyToken();
    spotify_access_token = response.data.access_token;

    res.json({ data: response.data });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};

export const spotifyLogin = (req: Request, res: Response) => {
  res.redirect(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id,
        redirect_uri: 'http://localhost:3001/spotify/spotifyLogin',
      })
  );
  // res.send('test');
};

export const getTrack = (req: Request, res: Response) => {
  const trackToGet = req.query.track;
  axios
    .get(`https://api.spotify.com/v1/tracks/${trackToGet}`, {
      headers: { Authorization: 'Bearer ' + spotify_access_token },
    })
    .then((response) => {
      res.send(response.data);
    });
};

export const getFeaturedPlaylists = (req: Request, res: Response) => {
  axios
    .get(`https://api.spotify.com/v1/browse/featured-playlists`, {
      headers: { Authorization: 'Bearer ' + spotify_access_token },
    })
    .then((response) => {
      res.send(response.data);
    });
};

export const getDailySong = (req: Request, res: Response) => {
  axios.get(process.env.DYNAMODB_URL).then((response) => {
    res.send(response.data);
  });
};

export const getRecommendations = (req: Request, res: Response) => {
  axios
    .get('https://api.spotify.com/v1/recommendations', {
      headers: {
        Authorization: 'Bearer ' + spotify_access_token,
      },
      params: {
        seed_artists: req.query.artistId,
        seed_genres: req.query.genre,
        seed_tracks: '32vE1nuG8T9c8bhmZdRY6d',
      },
    })
    .then((response) => {
      res.send(response.data);
    });
};

export const searchItem = (req: Request, res: Response) => {
  axios
    .get('https://api.spotify.com/v1/search', {
      headers: {
        Authorization: 'Bearer ' + spotify_access_token,
      },
      params: {
        q: `${req.query.searchType}:${req.query.search}`,
        type: req.query.searchType,
      },
    })
    .then((response) => {
      res.send(response.data);
    });
};
