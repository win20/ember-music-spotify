import axios from 'axios';
import { Request, Response } from 'express';

type SpotifyTokenReturn = {
  data: {
    status: number;
    spotify_token: string;
    error: string;
  };
};

class SpotifyFacade {
  private client_id: string = process.env.SPOTIFY_CLIENT_ID;
  private client_secret: string = process.env.SPOTIFY_SECRET;

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

    let returnValue = '';

    promise
      .then((response) => {
        return response.data.access_token;
      })
      .catch((error) => {
        return error;
      });

    return returnValue;
  }

  private getTrack(trackToGet: string, spotify_access_token: string) {
    axios
      .get(`https://api.spotify.com/v1/tracks/${trackToGet}`, {
        headers: { Authorization: 'Bearer ' + spotify_access_token },
      })
      .then((response) => {
        return response.data;
      });
  }

  private getFeaturedPlaylists(spotify_access_token: string) {
    axios
      .get(`https://api.spotify.com/v1/browse/featured-playlists`, {
        headers: { Authorization: 'Bearer ' + spotify_access_token },
      })
      .then((response) => {
        return response.data;
      });
  }

  private getDailySong() {
    axios.get(process.env.DYNAMODB_URL).then((response) => {
      return response.data;
    });
  }

  private getRecommendations(
    spotify_access_token: string,
    seed_artist: string,
    seed_genre: string,
    seed_track: string
  ) {
    let returnValue = undefined;

    axios
      .get('https://api.spotify.com/v1/recommendations', {
        headers: {
          Authorization: 'Bearer ' + spotify_access_token,
        },
        params: {
          seed_artists: seed_artist,
          seed_genres: seed_genre,
          seed_tracks: '32vE1nuG8T9c8bhmZdRY6d',
        },
      })
      .then((response) => {
        returnValue = response.data;
      });

    return returnValue;
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
