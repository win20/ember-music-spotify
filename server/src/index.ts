import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
require('dotenv').config();

const app = express();
app.use(express());

const corsOptions = {
  origin: 'http://localhost:5173',
};
app.use(cors(corsOptions));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Parse URL encoded bodies, grab data from form
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies, values from form come in as JSON
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'hello' });
});

app.get('/test-route', (req: Request, res: Response, next: NextFunction) => {
  console.log('cors route');
  res.json({ msg: 'CORS enabled' });
});

app.use('/spotify', require('./routes/spotifyRoutes'));

app.listen(3001, () => {
  console.log('listening on port 3001');
});
