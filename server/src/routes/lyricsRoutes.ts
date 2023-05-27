import express from 'express';
const router = express.Router();
import * as LyricsController from '../controllers/lyricsController';

router.get('/get-search-results', LyricsController.getSearchResults);
router.get('/get-lyrics', LyricsController.getLyricsFromUrl);

module.exports = router;
