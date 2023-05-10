import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
require('dotenv').config();

const app = express();
app.use(express());
app.use(cors());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  // res.header(
  //   'Access-Control-Allow-Headers',
  //   'Origin, X-Requested-With, Content-Type, Accept'
  // );
  next();
});

// Parse URL encoded bodies, grab data from form
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies, values from form come in as JSON
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'hello' });
  // console.log('test');
});

app.get('/api/getSpotifyToken', (req: Request, res: Response) => {});

app.use('/spotify', require('./routes/spotifyRoutes'));

app.listen(3001, () => {
  console.log('listening on port 3001');
});
