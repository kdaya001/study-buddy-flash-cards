const express = require('express');
const Cards = require('../../model/cards');
const router = express.Router();

router.get('/public/:tag', (req, res) => {
  Cards.getPublicCard(req.params.tag).then((response) => {
    res.json(response);
  });
});

router.get('/tags', (req, res) => {
  Cards.getPublicTags().then((response) => {
    res.json(response);
  })
});

module.exports = router;