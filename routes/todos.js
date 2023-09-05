const express = require('express');
const Todo = require('../models/Todo');

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


router.post('/', async (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).send('Title is required');
    }
    const todo = new Todo({
        title
    });
    try {
        const savedTodo = await todo.save();
        res.json(savedTodo);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


router.put('/:id', async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTodo);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const removedTodo = await Todo.findByIdAndRemove(req.params.id);
        res.json(removedTodo);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;