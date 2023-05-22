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
}
