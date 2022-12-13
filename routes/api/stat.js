const express = require('express');
const router = express.Router();
const {
    supermaster,
    ironmaster
} = require('../../controllers/statController');

router.get('/supermaster/:stagione', async (req, res) => {
    try {
        const result = await supermaster(req.params.stagione);
        res.json(result);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});
router.get('/ironmaster/:stagione', async (req, res) => {
    try {
        const result = await ironmaster(req.params.stagione);
        res.json(result);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});
module.exports = router;