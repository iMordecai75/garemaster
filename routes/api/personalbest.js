const express = require('express');
const router = express.Router();
const { getPersonalBest } = require('../../controllers/personalbestController');

router.get('/:vasca([0-9]{2})', async (req, res) => {
    try {
        const result = await getPersonalBest(req.params.vasca);
        res.json(result);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});
router.get('/:vasca([0-9]{2})/:categoria(M[0-9]{2,3})', async (req, res) => {
    try {
        const result = await getPersonalBest(req.params.vasca, req.params.categoria);
        res.json(result);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});
router.get('/:vasca([0-9]{2})/:stagione([0-9]{4})', async (req, res) => {
    try {
        const result = await getPersonalBest(req.params.vasca, '', req.params.stagione);
        res.json(result);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

module.exports = router;