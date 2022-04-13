import express from 'express';
const db = require('../database/db')

const router = express.Router();

router.get('/', async (req, res) => {
  const dbConnect = db.getDb();

  dbConnect
    .collection('global_cards')
    .find({'tag': 'Algorithms'})
    .toArray()
    .then(result => {
      res.json(result);
    })
  });

module.exports = router;