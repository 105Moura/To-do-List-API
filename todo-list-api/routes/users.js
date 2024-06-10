const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Registrar um novo usuário
router.post('/register', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        const token = jwt.sign({ _id: user._id }, 'secretkey');
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
});

// Login de usuário
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user || !await bcrypt.compare(req.body.password, user.password)) {
            return res.status(400).send('Invalid credentials');
        }
        const token = jwt.sign({ _id: user._id }, 'secretkey');
        res.send({ user, token });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
