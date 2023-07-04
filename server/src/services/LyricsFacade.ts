import axios from 'axios';
import https from 'https';

export default class LyricFacade {

  agent = new https.Agent({
    rejectUnauthorized: false,
  })

  public async getSearchResults(searchQuery: string): Promise<any> {
    const promise = await axios.get(`${process.env.GENIUS_URL}search`, {
      httpsAgent: this.agent,
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
      headers: {
        'x-api-key': process.env.AWS_API_KEY,
      },
    });

    return promise;
  }
}
