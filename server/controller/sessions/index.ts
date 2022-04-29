const express = require('express');
const UsersModel = require('../../model/users');
const bcrypt = require('bcrypt');

const router = express.Router();

// Create Session (Login)
router.post('/', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  UsersModel.getByEmail(email)
    .then((user) => {
      const valid = user && bcrypt.compareSync(password, user.password);

      if (valid) {
        req.session.user_id = user._id;
        req.session.email = user.email;
        console.log('successful login');
        res.json({
          user_id: user._id,
          email: email,
        });
      } else {
        return res.status(400).json({
          message: 'Invalid username or password',
        });
      }
    })
    .catch((error) => {
      return res.status(400).json({
        message: 'Invalid username or password',
      });
    });
});

// Get Session (Login)
router.get('/', (req, res) => {
  if (req.session.email) {
    res.json({
      user_id: req.session._id,
      email: req.session.email,
    });
  } else {
    res.json({
      status: 'not logged in',
    })
  }
});

//Delete Session (Logout)
router.delete('/', (req, res) => {
  (console.log(req.session))
  req.session.destroy();
  res.json({ message: 'Logged out' });
});

module.exports = router;
