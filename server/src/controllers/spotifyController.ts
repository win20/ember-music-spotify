import { Request, Response } from 'express';
import MusicFacade from '../services/MusicFacade';
import { logger } from '../services/logger';
import { extractAxiosErrorData } from '../helpers';

let spotify_access_token = '';
const musicFacade = new MusicFacade();
const locationPrefix = 'controllers.spotifyController';

export const getSpotifyToken = async (req: Request, res: Response) => {
  try {
    const response = await musicFacade.getSpotifyToken();
    spotify_access_token = response.data.access_token;

    res.json({ data: response.data });
  } catch (e) {
    const errorData = extractAxiosErrorData(e, locationPrefix + '.getSpotifyToken');

    logger.error(JSON.stringify(errorData));
    res.send(e);
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
  } catch (e) {
    const errorData = extractAxiosErrorData(e, locationPrefix + '.getTrack');

    logger.error(JSON.stringify(errorData));
    res.send(e);
  }
};

export const getFeaturedPlaylists = async (req: Request, res: Response) => {
  try {
    const response = await musicFacade.getFeaturedPlaylists(
      spotify_access_token
    );
    res.json({ data: response });
  } catch (e) {
    const errorData = extractAxiosErrorData(e, locationPrefix + '.getFeaturedPlaylists');

    logger.error(JSON.stringify(errorData));
    res.send(e);
  }
};

export const getDailySong = async (req: Request, res: Response) => {
  try {
    const response = await musicFacade.getDailySong();

    logger.info(locationPrefix + '.getDailySong: daily song successfully retrieved');
    res.send(response);
  } catch (e) {
    const errorData = extractAxiosErrorData(e, locationPrefix + '.getDailySong');

    logger.error(JSON.stringify(errorData));
    res.send(e);
  }
};

export const getRecommendations = async (req: Request, res: Response) => {
  try {
    const response = await musicFacade.getRecommendations(
      spotify_access_token,
      req.query.artistId.toString(),
      req.query.genre.toString(),
      req.query.songId.toString(),
    );
    res.send(response);
  } catch (e) {
    const errorData = extractAxiosErrorData(e, locationPrefix + '.getRecommendations');

    logger.error(JSON.stringify(errorData));
    res.send(e);
  }
};

export const searchItem = async (req: Request, res: Response) => {
  try {
    const response = await musicFacade.searchItem(
      spotify_access_token,
      req.query.searchType,
      req.query.search
    );

    res.send(response.data);
  } catch (e) {
    const errorData = extractAxiosErrorData(e, locationPrefix + '.searchItem');

    logger.error(JSON.stringify(errorData));
    res.send(e);
  }
};
