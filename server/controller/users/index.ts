import express from "express";
const Users = require('../../model/users');
const UsersController = express.Router();

UsersController.post('/', (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  }

  Users.createUser(user).then((response) => {
    res.json({status: 'ok'});
  });
});

module.exports = UsersController;