import express from 'express';
const db = require('../database/db');

const Cards = {
  getPublicCards: async () => {
    const dbConnect = db.getDb();
    return await dbConnect.collection('global_cards').find({}).toArray();
  },
  getPublicTags: async () => {
    const dbConnect = db.getDb();
    return await dbConnect
      .collection('global_cards')
      .find({}, {projection: {tag: 1, _id: 0}})
      .toArray();
  },
};

module.exports = Cards;
