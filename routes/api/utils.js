const express = require('express');
const router = express.Router();
const {
    tipoVasche,
    categorie,
    stagioni,
    specialita
} = require('../../controllers/utilsController');

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

module.exports = router;