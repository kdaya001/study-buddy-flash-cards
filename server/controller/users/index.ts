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

UsersController.get(`/getByEmail/:email`, (req,res) => {
  Users.getByEmail(req.params.email).then((response) => {
    const status = response.length > 0;
    res.json(status)
  })
})

module.exports = UsersController;
