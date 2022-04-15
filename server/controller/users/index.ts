import express from 'express';
const Users = require('../../model/users');
const UsersController = express.Router();
import bcrypt from 'bcrypt';

UsersController.post('/', (req, res) => {
  const user = req.body;

  user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());

  Users.createUser(user).then((response) => {
    res.json({ status: 'ok' });
  });
});

module.exports = UsersController;
