const express = require('express');
const router = express.Router();


const UsersServices = require('../services/users.services');
const service = new UsersServices();

// GET ALL
router.get('/', async (req, res, next) => {
    try {
        const users = await service.find();
        res.json(users); 
    } catch (error) {
        next(error)
    }
});

// GET ONE USER
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const users = service.findOne(id);
    res.json(users);
});

// CREATE
router.post('/', (req, res) => {
    const body = req.body;
    const newUser = service.create(body);
    res.status(201).json({
        message: 'create',
        data: newUser
    })
});

// UPDATE ONE ITEM
router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const user = service.update(id, body);
    res.json({
        message: 'update',
        data: user
    })
});

// DELETE ONE ITEM
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const response = service.delete(id);
    res.json({
        message: 'delete',
        response
    })
});



module.exports = router