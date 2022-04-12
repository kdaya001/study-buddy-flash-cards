import express from 'express';
import { run } from '../database/db';

const router = express.Router();

router.get('/', async (req, res) => {
  run().then(db => {
    const cursor = db.collection('global_cards').find({});
  
    cursor.toArray().then((result) => {
      res.json(result);
    });
  })
});

module.exports = router;