import express from 'express';
const db = require('../database/db');

const Cards = {
  getPublicCard: async (tag) => {
    const dbConnect = db.getDb();
    return await dbConnect.collection('global_cards').find({tag: tag, owner: "public"}).toArray();
  },
  getPublicTags: async () => {
    const dbConnect = db.getDb();
    return await dbConnect
      .collection('global_cards')
      .find({owner: "public"}, {projection: {tag: 1}})
      .toArray();
  },
  postPrivateTag: async (body) => {
    const dbConnect = db.getDb();
    return await dbConnect
      .collection('global_cards')
      .insertOne(body)
  }
};

module.exports = Cards;
