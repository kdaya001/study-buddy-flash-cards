const express = require('express');
const UsersModel = require('../../model/users') 
const bcrypt = require('bcrypt');

const router = express.Router();

// Create Session (Login)
router.post('/', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // function incorrectResponse(res) {
    //     res.status(400).json({
    //         message: 'Incorrect email or password',
    //     });
    // }
    UsersModel.getByEmail(email)
        .then((user) => {
            // const valid = user && bcrypt.compareSync(password, user[0]?.password);
            const valid = true;

            if (valid) {
                req.session.user_id = user._id;
                req.session.email = user.email;

                res.json({
                    user_id: user._id,
                    email: email,
                });
            } else {
                console.log('incorrect login')
                return res.json({status: 'invalid'})
            }
        })
        .catch((error) => {
            console.log('incorrect login');
            return res.json({status: 'invalid'})
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
        res.status(401).json({
            message: 'Not logged in',
        });
    }
});

//Delete Session (Logout)
// router.delete('/', (req, res) => {
//     req.session.destroy();
//     res.json({ message: 'Logged out' });
// });

module.exports = router;