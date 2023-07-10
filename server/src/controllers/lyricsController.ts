import { Request, Response } from 'express';
import LyricFacade from '../services/LyricsFacade';
import { logger } from '../services/logger';
import { extractAxiosErrorData } from '../helpers';

const lyricFacade = new LyricFacade();
const locationPrefix = 'controllers.lyricsController';

export const getSearchResults = async (req: Request, res: Response) => {
  const searchTerm = req.query.searchTerm;
  try {
    const response = await lyricFacade.getSearchResults(searchTerm as string);

    logger.info(locationPrefix + 'getSearchResults: Search ')
    res.send(response.data);
  } catch (e) {
    const errorData = extractAxiosErrorData(e, locationPrefix + '.getSearchResults');

    logger.error(JSON.stringify(errorData));
    res.send(e);
  }
};

export const getLyricsFromUrl = async (req: Request, res: Response) => {
  const url = req.query.url;
  try {
    const response = await lyricFacade.getLyricsFromUrl(url as string);
    res.send(response.data);
  } catch (e) {
    const errorData = extractAxiosErrorData(e, locationPrefix + '.getLyricsFromUrl');

    logger.error(JSON.stringify(errorData));
    res.send(e);
  }
};
