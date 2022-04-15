import express from "express";

const Cards = require('../../model/cards');
const PublicCardsController = express.Router();

PublicCardsController.get('/public/:tag', (req, res) => {
  Cards.getPublicCard(req.params.tag).then((response) => {
    res.json(response);
  });
});

PublicCardsController.get('/tags', (req, res) => {
  Cards.getPublicTags().then((response) => {
    res.json(response);
  })
});

module.exports = PublicCardsController;
