if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import MongoStore from 'connect-mongo';
const publicCardsController = require('./controller/cards/index');
const usersController = require('./controller/users/index');
const sessionsController = require('./controller/sessions/index');

const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const PORT =
  process.env.PORT || (process.env.NODE_ENV === 'production' && 3000) || 3001;
const expressSession = require('express-session');
const app = express();

declare module 'express-session' {
  interface SessionData {
    email: string;
    user_id: string;
  }
}

app.set('trust proxy', 1);
app.use(logger);
app.use(express.json()); // support json encoded bodies
app.use(cors());
const db = require('./database/db');
const helmet = require('helmet')


app.use(
  helmet()
);


app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({
      mongoUrl: process.env.DATABASE_URL,
      ttl: 1 * 24 * 60 * 60,
    }),
    resave: true,
    saveUninitialized: false,
  })
);

app.use('/api/cards', publicCardsController);
app.use('/api/users', usersController);
app.use('/api/sessions/', sessionsController);

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

  app.use(errorHandler);

  app.listen(+PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
