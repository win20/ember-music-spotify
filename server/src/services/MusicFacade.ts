import axios from 'axios';
import * as spotifyModels from '../models/SpotifyModels';
import { logger } from './logger';

class MusicFacade {
  private client_id: string = process.env.SPOTIFY_CLIENT_ID;
  private client_secret: string = process.env.SPOTIFY_SECRET;

  public async getSpotifyToken(): Promise<spotifyModels.SpotifyTokenPromise> {
    const promise = await axios.post(
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

    return promise;
  }

  public async getTrack(
    trackToGet: string,
    spotify_access_token: string
  ): Promise<spotifyModels.Track> {
    const promise = await axios.get(
      `https://api.spotify.com/v1/tracks/${trackToGet}`,
      {
        headers: { Authorization: 'Bearer ' + spotify_access_token },
      }
    );

    return promise.data;
  }

  public async getFeaturedPlaylists(
    spotify_access_token: string
  ): Promise<spotifyModels.Playlist[]> {
    const promise = await axios.get(
      `https://api.spotify.com/v1/browse/featured-playlists`,
      {
        headers: { Authorization: 'Bearer ' + spotify_access_token },
      }
    );

    return promise.data;
  }

  public async getDailySong(): Promise<spotifyModels.Track> {
    const promise = await axios.get(process.env.DYNAMODB_URL, {
      headers: {
        'x-api-key': process.env.AWS_API_KEY,
      },
    });
    return promise.data;
  }

  public async searchItem(
    spotify_access_token: string,
    searchType: any,
    search: any
  ): Promise<any> {
    const promise = axios.get<spotifyModels.Artist, spotifyModels.Artist>(
      'https://api.spotify.com/v1/search',
      {
        headers: {
          Authorization: 'Bearer ' + spotify_access_token,
        },
        params: {
          q: `${searchType}:${search}`,
          type: searchType,
        },
      }
    );

    return promise;
  }

  public async getRecommendations(
    spotify_access_token: string,
    seed_artist: string,
    seed_genre: string,
    seed_track: string
  ): Promise<spotifyModels.Track[]> {
    const promise = await axios.get(
      'https://api.spotify.com/v1/recommendations',
      {
        headers: {
          Authorization: 'Bearer ' + spotify_access_token,
        },
        params: {
          seed_artists: seed_artist,
          seed_genres: seed_genre,
          seed_tracks: '32vE1nuG8T9c8bhmZdRY6d',
        },
      }
    );

    return promise.data;
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

export default MusicFacade;
