import express from 'express';
import { resolve } from 'path';
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
  },
  getPrivateTags: async (user_id) => {
    const dbConnect = db.getDb();
    return await dbConnect
      .collection('global_cards')
      .find({owner: user_id}, {projection: {tag: 1}})
      .toArray()
  },
  updatePrivateCard: async ({owner, tag, cards}) => {
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
      .updateOne({owner: owner, tag: tag}, {$push: {cards: {$each: [...cards]}}})
  }
};

module.exports = Cards;
