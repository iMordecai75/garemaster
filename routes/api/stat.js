const express = require('express');
const { verifyToken } = require('../../middlewares');
const router = express.Router();
const {
    supermaster,
    ironmaster,
    getPersonalBest
} = require('../../controllers/statController');

router.use(verifyToken);

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
router.get('/personalbest/:vasca([0-9]+)', async (req, res) => {
    try {        
        const result = await getPersonalBest(req.params.vasca, req.query);

        res.json(result);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});
module.exports = router;