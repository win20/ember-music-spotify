import { Request, Response } from 'express';
import MusicFacade from '../services/MusicFacade';

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
    res.json({ data: response });
  } catch (error) {
    res.json({ error });
  }
};

export const getFeaturedPlaylists = async (req: Request, res: Response) => {
  try {
    const response = await musicFacade.getFeaturedPlaylists(
      spotify_access_token
    );
    res.json({ data: response });
  } catch (error) {
    res.json({ error });
  }
};

export const getDailySong = async (req: Request, res: Response) => {
  try {
    const response = await musicFacade.getDailySong();
    res.json({ data: response });
  } catch (error) {
    res.json({ error });
  }
};

export const getRecommendations = async (req: Request, res: Response) => {
  try {
    const response = await musicFacade.getRecommendations(
      spotify_access_token,
      '5t5FqBwTcgKTaWmfEbwQY9',
      'pop',
      'test'
    );
    res.json({ data: response });
  } catch (error) {
    res.json({ error });
  }
};

export const searchItem = async (req: Request, res: Response) => {
  try {
    const response = await musicFacade.searchItem(
      spotify_access_token,
      req.query.searchType,
      req.query.search
    );

    res.json({ data: response.data });
  } catch (error) {
    res.json({ error });
  }
};
