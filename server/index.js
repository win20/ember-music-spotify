const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express());
app.use(cors());

// Parse URL encoded bodies, grab data from form
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies, values from form come in as JSON
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/getSpotifyToken', (req, res) => {});

app.use('/spotify', require('./routes/spotifyRoutes'));

app.listen(3001, () => {
  console.log('listening on port 3001');
});
