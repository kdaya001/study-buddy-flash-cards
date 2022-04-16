import express from "express";

const Cards = require('../../model/cards');
const CardController = express.Router();

CardController.get('/public/:tag', (req, res) => {
  Cards.getPublicCard(req.params.tag).then((response) => {
    res.json(response);
  });
});

CardController.get('/public/get/tags', (req, res) => {
  Cards.getPublicTags().then((response) => {
    res.json(response);
  })
});


CardController.post('/private/create', (req, res) => {
  console.log(req.body.tag)
  //todo get session
  const body = {
    tag: req.body.tag,
    owner: 'public',
    cards: [],
  }
  Cards.postPrivateTag(body).then(response => {
    res.json({status: 'success'});
  })
});

module.exports = CardController;
