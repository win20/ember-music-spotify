export interface SpotifyTokenPromise {
  data: {
    status: number;
    access_token: string;
    error: string;
  };
}

// Full song response can be found in the Spotify documentation
// https://developer.spotify.com/documentation/web-api/reference/get-recommendations
export interface Track {
  album: {
    album_type: string;
    total_tracks: number;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: [
      {
        url: string;
        height: number;
        width: number;
      }
    ];
    name: string;
    release_date: string;
    type: string;
    uri: string;
    genres: string[];
  };
  artists: [
    {
      external_urls: {
        spotify: string;
      };
      id: string;
      name: string;
      uri: string;
    }
  ];
  href: string;
  id: string;
  name: string;
  uri: string;
  duration_ms: number;
  external_urls: {
    spotify: string;
  };
}

// Full song response can be found in the Spotify documentation
// https://developer.spotify.com/documentation/web-api/reference/get-playlist
export interface Playlist {
  description: string;
  external_urls: {
    spotify: string;
  };
  id: string;
  images: [
    {
      url: string;
      height: number;
      width: number;
    }
  ];
  name: string;
}

// Full song response can be found in the Spotify documentation
// https://developer.spotify.com/documentation/web-api/reference/get-an-artist
export interface Artist {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: [
    {
      url: string;
      height: number;
      width: number;
    }
  ];
  name: string;
  popularity: number;
  type: 'artist';
  uri: string;
}
