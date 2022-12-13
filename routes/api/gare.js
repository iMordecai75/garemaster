const express = require('express');
const router = express.Router();
const {
    getListGare,
    getGaraById,
    insertGara,
    updateGara,
    deleteGara
} = require('../../controllers/gareController');

router.get('/', async (req, res) => {
    try {

        const result = await getListGare(req.body);

        res.json(result);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});
router.get('/:id([0-9]+)', async (req, res) => {
    try {
        const result = await getGaraById(req.params.id);

        res.json(result);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});
router.patch('/:id([0-9]+)', async (req, res) => {
    try {
        const result = await updateGara(req.params.id, req.body);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});
router.post('/', async (req, res) => {
    try {
        const result = await insertGara(req.body);
        res.json(result);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});
router.delete('/:id([0-9]+)', async (req, res) => {
    try {
        const result = await deleteGara(req.params.id);
        res.json(result);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

module.exports = router;