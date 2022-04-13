import express from 'express';
const db = require('../database/db');

const Cards = {
  getPublicCard: async (tag) => {
    const dbConnect = db.getDb();
    return await dbConnect.collection('global_cards').find({tag: tag}).toArray();
  },
  getPublicTags: async () => {
    const dbConnect = db.getDb();
    return await dbConnect
      .collection('global_cards')
      .find({}, {projection: {tag: 1}})
      .toArray();
  }
};

module.exports = Cards;
