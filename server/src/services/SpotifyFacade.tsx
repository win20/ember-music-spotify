import axios from 'axios';

type SpotifyTokenReturn = {
  data: {
    status: number;
    spotify_token: string;
    error: string;
  };
};

class SpotifyFacade {
  private client_id = process.env.SPOTIFY_CLIENT_ID;
  private client_secret = process.env.SPOTIFY_SECRET;

  private getSpotifyToken(): string {
    const promise = axios.post(
      'https://accounts.spotify.com/api/token',
      this.serialize({
        grant_type: 'client_credentials',
      }),
      {
        headers: {
          Authorization:
            'Basic ' + btoa(this.client_id + ':' + this.client_secret),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    // let dataToReturn: SpotifyTokenReturn = null;

    // const access_token = promise
    //   .then((response) => return response.data.access_token)
    //   .catch((error) => res.send(error));

    promise
      .then((response) => {
        return response.data.access_token;
      })
      .catch((error) => {
        return error;
      });
  }

  private serialize(obj: { grant_type: string }): string {
    let str = [];
    for (let p in obj) {
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    }
    return str.join('&');
  }
}
