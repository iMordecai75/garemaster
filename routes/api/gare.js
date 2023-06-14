const express = require('express');
const { verifyToken } = require('../../middlewares');
const router = express.Router();

const {
    getListGare,
    getGaraById,
    insertGara,
    importGare,
    updateGara,
    deleteGara
} = require('../../controllers/gareController');

router.use(verifyToken);


router.get('/', async (req, res) => {
    try {
        const result = await getListGare(req.query);

        res.json(result);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});
router.get('/:id([0-9]+)', async (req, res) => {
    try {
        const result = await getGaraById(req.params.id);

        res.json(result[0]);
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
router.post('/import', async (req, res) => { 
    try {
        const result = await importGare(req.body);
        res.json(result);        
    } catch (error) {
        res.status(500).send(error.toString());
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