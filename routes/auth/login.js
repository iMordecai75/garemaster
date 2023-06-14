const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const router = express.Router();
const {
    userLogin
} = require('../../controllers/userController');

router.post('/', async (req, res) => { 
    try {
        const username = req.body.username;
        const password = req.body.password;

        const result = await userLogin(username, password);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

module.exports = router;