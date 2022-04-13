if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
const publicCards = require('./controller/public-cards/index');

const PORT =
  process.env.PORT || (process.env.NODE_ENV === 'production' && 3000) || 3001;
const app = express();

app.set('trust proxy', 1);
app.use(express.json()); // support json encoded bodies
app.use(cors());
const db = require('./database/db')

app.use('/api/cards', publicCards);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

//perform the DB connection when the server starts
db.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }

  app.listen(+PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
