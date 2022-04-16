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

CardController.post('/private/create/tag', (req, res) => {
  const body = {
    tag: req.body.tag,
    owner: req.session.user_id,
    cards: [],
  }
  Cards.postPrivateTag(body).then(response => {
    res.json({status: 'success'});
  })
});

CardController.post('/private/update/cards', (req, res) => {
  Cards.updatePrivateCard(req.body).then(response => {
    res.json({status: 'success'});
  })
})

CardController.get('/private/get/tags', (req, res) => {
  Cards.getPrivateTags(req.session.user_id).then((response) => {
    res.json(response);
  })
});

CardController.get('/private/:tag', (req, res) => {
  const body = {
    tag: req.params.tag,
    user_id: req.session.user_id
  }
  Cards.getPrivateCard(body).then((response) => {
    res.json(response);
  });
});

module.exports = CardController;
