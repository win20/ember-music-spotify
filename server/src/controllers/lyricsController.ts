import { Request, Response } from 'express';
import LyricFacade from '../services/LyricsFacade';

const lyricFacade = new LyricFacade();

export const getSearchResults = async (req: Request, res: Response) => {
  const searchTerm = req.query.searchTerm;
  try {
    const response = await lyricFacade.getSearchResults(searchTerm as string);
    res.send(response.data);
  } catch (error) {
    res.send(error);
  }
};

export const getLyricsFromUrl = async (req: Request, res: Response) => {
  const url = req.query.url;
  try {
    const response = await lyricFacade.getLyricsFromUrl(url as string);
    res.send(response.data);
  } catch (error) {
    res.send(error);
  }
};
