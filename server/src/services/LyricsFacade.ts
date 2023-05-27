import axios from 'axios';

export default class LyricFacade {
  public async getSearchResults(searchQuery: string): Promise<any> {
    const promise = await axios.get(`${process.env.GENIUS_URL}search`, {
      params: {
        q: searchQuery,
      },
      headers: {
        Authorization: `Bearer ${process.env.GENIUS_TOKEN}`,
      },
    });

    return promise;
  }

  public async getLyricsFromUrl(url: string): Promise<any> {
    const promise = await axios.get(`${process.env.GET_LYRICS_URL}`, {
      params: {
        url: url,
      },
    });

    return promise;
  }
}
