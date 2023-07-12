const axios = require('axios');

const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.region });
const dynamo = new AWS.DynamoDB.DocumentClient({
  region: process.env.region,
});

const serialize = function (obj) {
  var str = [];
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  }
  return str.join('&');
};

exports.handler = async function (event) {
  // Delete items in DB
  const params = {
    TableName: process.env.dailySongTable,
  };
  const items = await dynamo.scan(params).promise();

  if (items.Items.length > 0) {
    const itemToDeleteId = items.Items[0].id;
    let params2 = {
      TableName: process.env.dailySongTable,
      Key: {
        id: itemToDeleteId,
      },
    };

    await dynamo.delete(params2).promise();
  }

  // Call Spotify API to get access token
  let axiosResponse = await axios.post(
    'https://accounts.spotify.com/api/token',
    serialize({
      grant_type: 'client_credentials',
    }),
    {
      headers: {
        Authorization:
          'Basic ' +
          btoa(
            'ae1b2db7d46c4f10865278144d32dcaf' +
              ':' +
              'def936838b5c40fe9208155c03fa440f'
          ),
      },
    }
  );
  const access_token = axiosResponse.data.access_token;

  const randNumPlaylist = Math.floor(Math.random() * 11);

  // Get featured playlist
  let playlistResponse = await axios.get(
    'https://api.spotify.com/v1/browse/featured-playlists',
    {
      headers: { Authorization: 'Bearer ' + access_token },
    }
  );
  const playlistId =
    playlistResponse.data.playlists.items[randNumPlaylist]['id'];

  const randNumTrack = Math.floor(Math.random() * 11);

  // Get song from playlist
  let getTrackResponse = await axios.get(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      headers: { Authorization: 'Bearer ' + access_token },
    }
  );

  const dailyTrack = getTrackResponse.data.items[randNumTrack];

  await dynamo
    .put({
      TableName: process.env.dailySongTable,
      Item: {
        id: Date.now().toString(),
        track: dailyTrack,
      },
    })
    .promise();

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dailyTrack),
  };
};
