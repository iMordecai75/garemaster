const express = require('express');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../../middlewares');
const router = express.Router();
const {
    getUserById,
    insertUser,
    updateUser,
    deleteUser
} = require('../../controllers/userController');

router.get('/:id', verifyToken, async (req, res) => { 
    try {
        const result = await getUserById(req.params.id);

        res.json(result[0]);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

router.patch('/:id', verifyToken, async (req, res) => { 
    try {
        const result = await updateUser(req.params.id, req.body);

        res.json(result);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

router.post('/', async (req, res) => { 
    try {
        const result = await insertUser(req.body);        
        res.json(result);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

router.delete('/:id', verifyToken, async (req, res) => { 
    try {
        const result = await deleteUser(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

module.exports = router;