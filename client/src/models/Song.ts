// Full song response can be found in the Spotify documentation
// https://developer.spotify.com/documentation/web-api/reference/get-recommendations

interface Song {
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
}

export default Song;
