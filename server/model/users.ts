import express from 'express';
const db = require('../database/db');

const Users = {
  createUser: async (user) => {
    const dbConnect = db.getDb();
    await dbConnect
        .collection('users')
        .insert([{ email: user.email, password: user.password}])
  }
};
module.exports = Users;
