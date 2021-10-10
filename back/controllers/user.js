const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { request } = require('../server');
const jsontoken = require('jsonwebtoken');

const User = mongoose.model('User');

exports.getToken = (req, res) => {
    User.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
            return res.status(401).json({ error: 'pas trouvé' });
        }
        bcrypt
            .compare(req.body.password, user.password)
            .then((ok) => {
                if (!ok) {
                    return res.status((401).json({ error: 'incorect mdp' }));
                }
                res.status(200).json({
                    userId: user._id,
                    userEmail: user.email,
                    token: jsontoken.sign({ userId: user._id }, 'jesuissecret', { expiresIn: '48h' }),
                });
            })
            .catch((error) => res.status(500).json({ error }));
    });
};

exports.signup = (req, res, next) => {
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                email: req.body.email,
                password: hash,
            });
            user.save()
                .then((data) => {
                    this.getToken(req, res);
                })
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    this.getToken(req, res);
};
