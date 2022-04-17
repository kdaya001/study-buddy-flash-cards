import express from 'express';
import { ObjectId } from 'mongodb';
const db = require('../database/db');

const Cards = {
  getPublicCard: async (tag) => {
    const dbConnect = db.getDb();
    return await dbConnect
      .collection('global_cards')
      .find({ tag: tag, owner: 'public' })
      .toArray();
  },
  getPublicTags: async () => {
    const dbConnect = db.getDb();
    return await dbConnect
      .collection('global_cards')
      .find({ owner: 'public' }, { projection: { tag: 1, owner: 1 } })
      .toArray();
  },
  postPrivateTag: async (body) => {
    const dbConnect = db.getDb();
    return await dbConnect.collection('global_cards').insertOne(body);
  },
  getPrivateTags: async (user_id) => {
    const dbConnect = db.getDb();
    return await dbConnect
      .collection('global_cards')
      .find({ owner: user_id }, { projection: { tag: 1 } })
      .toArray();
  },
  updatePrivateCard: async ({ owner, tag, cards }) => {
    //expect body to be in the following format:
    /**
     * {owner:xyz
     * tag: xyz
     * cards: [ {
     * prompt: xyz
     * response: xyz}
     * ]
     * }
     */

    const dbConnect = db.getDb();
    return await dbConnect
      .collection('global_cards')
      .updateOne(
        { owner: owner, tag: tag },
        { $push: { cards: { $each: [...cards] } } }
      );
  },
  getPrivateCard: async ({ tag, user_id }) => {
    const dbConnect = db.getDb();
    return await dbConnect
      .collection('global_cards')
      .findOne({ tag: tag, owner: user_id });
  },
  getCard: async (id) => {
    const dbConnect = db.getDb();
    return await dbConnect
      .collection('global_cards')
      .find({ _id: new ObjectId(String(id).trim()) })
      .toArray();
  },
};

module.exports = Cards;
