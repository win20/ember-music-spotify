import serverless from 'serverless-http';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
require('dotenv').config();

const port = 3001;
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

app.get('/', (req, res) => {
  res.status(200).send('Hello from root');
});
app.use('/spotify', require('./routes/spotifyRoutes'));
app.use('/lyrics', require('./routes/lyricsRoutes'));

if (process.env.ENVIRONMENT = 'dev') {
  app.listen(port, () => {
      console.log(`listening on port ${port}`);
  });
}     
// export const handler = serverless(app);
