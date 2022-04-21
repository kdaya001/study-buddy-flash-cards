const db = require('../database/db');

const Users = {
  createUser: async (user) => {
    const dbConnect = db.getDb();
    await dbConnect
        .collection('users')
        .insert([{ email: user.email, password: user.password}])
  },
  getByEmail: async (email) => {
    const dbConnect = db.getDb();
    return await dbConnect
      .collection('users')
      .findOne({email: email})
  }
};
module.exports = Users;
