const express = require('express');
const { verifyToken } = require('../../middlewares');
const router = express.Router();
const {
    tipoVasche,
    categorie,
    stagioni,
    specialita,
    atleti
} = require('../../controllers/utilsController');

router.use(verifyToken);

router.get('/specialita', async (req, res) => {
    try {
        const result = await specialita();
        res.json(result);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});
router.get('/stagioni', async (req, res) => {
    try {
        const result = await stagioni();
        res.json(result);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});
router.get('/categorie', async (req, res) => {
    try {
        const result = await categorie();
        res.json(result);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});
router.get('/tipovasca', async (req, res) => {
    try {
        const result = await tipoVasche();
        res.json(result);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});
router.get('/atleti', async (req, res) => { 
    try {
        const result = await atleti();
        res.json(result);
    } catch (error) {
        res.status(500).send(e.toString());
    }
})

module.exports = router;