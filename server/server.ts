if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
const testController = require('./controller/test');

const PORT =
  process.env.PORT || (process.env.NODE_ENV === 'production' && 3000) || 3001;
const app = express();

app.set('trust proxy', 1);
app.use(express.json()); // support json encoded bodies
app.use(cors());

// const uri = 'mongodb://127.0.0.1:27017';
// const client = new MongoClient(uri);
// let db = null;
// async function run() {
//   await client.connect();
//   db = client.db('study-buddy');
//   console.log('Connected successfully to server');
// }
// run().catch(console.log);

app.use('/api/cards', testController);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

app.listen(+PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
