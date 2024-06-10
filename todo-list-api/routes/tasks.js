const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

// Criar uma nova tarefa
router.post('/', auth, async (req, res) => {
    try {
        const task = new Task({
            ...req.body,
            user: req.user._id
        });
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Obter todas as tarefas do usuário
router.get('/', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Atualizar uma tarefa
router.patch('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Excluir uma tarefa
router.delete('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
