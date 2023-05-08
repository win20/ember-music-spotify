import express from 'express';
const router = express.Router();
import * as spotifyController from '../controllers/spotifyController';

router.get('/', spotifyController.getSpotifyToken);
router.get('/getTrack', spotifyController.getTrack);
router.get('/getFeaturedPlaylists', spotifyController.getFeaturedPlaylists);
router.get('/getDailySong', spotifyController.getDailySong);
router.get('/getRecommendations', spotifyController.getRecommendations);
router.get('/searchItem', spotifyController.searchItem);
router.get('/spotifyLogin', spotifyController.spotifyLogin);
// router.get('/spotifyAuthToken', spotifyController.getAuthToken);

module.exports = router;
