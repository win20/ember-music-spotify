import express from 'express';
const router = express.Router();
import * as LyricsController from '../controllers/lyricsController';

router.get('/get-search-results', LyricsController.getSearchResults);

module.exports = router;
