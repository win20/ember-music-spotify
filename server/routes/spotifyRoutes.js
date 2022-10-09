const express = require('express');
const router = express.Router();
const spotifyController = require('../controllers/spotifyController');

router.get('/', spotifyController.getSpotifyToken);
router.get('/getTrack', spotifyController.getTrack);
router.get('/getFeaturedPlaylists', spotifyController.getFeaturedPlaylists);

module.exports = router;
