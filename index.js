const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let tasks = [];

app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
    const newTask = {
        id: Date.now(),
        text: req.body.text,
        category: req.body.category,
        completed: false,
        remainingTime: req.body.remainingTime || 0,
        originalTime: req.body.remainingTime || 0,
        isRunning: false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.put('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const index = tasks.findIndex(t => t.id == id);
    if (index !== -1) {
        tasks[index] = { ...tasks[index], ...req.body };
        res.json(tasks[index]);
    } else {
        res.status(404).send("Task not found");
    }
});

app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter(t => t.id != id);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});