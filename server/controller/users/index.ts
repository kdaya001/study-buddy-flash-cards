import express from 'express';
const Users = require('../../model/users');
const UsersController = express.Router();
import bcrypt from 'bcrypt';
import { validateCreateUser } from '../../middleware/validateCreateUser';

UsersController.post('/', validateCreateUser, async (req, res) => {

  const exists = await Users.getByEmail(req.body.email);
  if(!exists) {
    const user = req.body;

    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());

    Users.createUser(user).then((response) => {
      res.json({ status: 'ok' });
    });
  } else {
    throw new Error('Account already exists');
  }
});

UsersController.get(`/getByEmail/:email`, (req,res) => {
  Users.getByEmail(req.params.email).then((response) => {
    res.json(response)
  })
})

module.exports = UsersController;
