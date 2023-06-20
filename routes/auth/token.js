const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const router = express.Router();
const {
    getToken
} = require('../../controllers/tokenController');

router.post('/', async (req, res) => { 
    try {
        const apikey = req.body.apikey;        

        const result = await getToken(apikey);
        
        res.json(result);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});
module.exports = router;