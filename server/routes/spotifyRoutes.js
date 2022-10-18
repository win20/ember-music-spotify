const express = require('express');
const router = express.Router();
const spotifyController = require('../controllers/spotifyController');

router.get('/', spotifyController.getSpotifyToken);
router.get('/getTrack', spotifyController.getTrack);
router.get('/getFeaturedPlaylists', spotifyController.getFeaturedPlaylists);
router.get('/getDailySong', spotifyController.getDailySong);
router.get('/getRecommendations', spotifyController.getRecommendations);
router.get('/searchItem', spotifyController.searchItem);

module.exports = router;
