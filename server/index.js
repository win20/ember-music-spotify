const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express());
app.use(cors());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Parse URL encoded bodies, grab data from form
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies, values from form come in as JSON
app.use(express.json());

app.get('/', (req, res) => {
  res.send(process.env.SPOTIFY_CLIENT_ID);
});

app.get('/api/getSpotifyToken', (req, res) => {});

app.use('/spotify', require('./routes/spotifyRoutes'));

app.listen(3001, () => {
  console.log('listening on port 3001');
});
