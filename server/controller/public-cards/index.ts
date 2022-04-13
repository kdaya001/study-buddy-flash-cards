const express = require('express');
const Cards = require('../../model/cards');
const router = express.Router();

router.get('/', (req, res) => {
  Cards.getPublicCards().then((response) => {
    res.json(response);
  });
});

router.get('/tags', (req, res) => {
  Cards.getPublicTags().then((response) => {
    res.json(response);
  })
});

module.exports = router;
