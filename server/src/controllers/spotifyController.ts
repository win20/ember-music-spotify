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

export const getSpotifyToken = async (req: Request, res: Response) => {
  try {
    const response = await musicFacade.getSpotifyToken();
    spotify_access_token = response.data.access_token;

    res.json({ data: response.data });
  } catch (error) {
    res.json({ error });
  }
};

export const getTrack = async (req: Request, res: Response) => {
  const trackToGet = req.query.track as string;
  try {
    const response = await musicFacade.getTrack(
      trackToGet,
      spotify_access_token
    );
    res.json({ data: response.data });
  } catch (error) {
    res.json({ error });
  }
};

export const getFeaturedPlaylists = async (req: Request, res: Response) => {
  try {
    const response = await musicFacade.getFeaturedPlaylists(
      spotify_access_token
    );
    res.json({ data: response.data });
  } catch (error) {
    res.json({ error });
  }
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
