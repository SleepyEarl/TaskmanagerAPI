const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let tasks = [];
let categories = ["Personal", "Work", "Urgent"];

app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
    const { text, category, remainingTime } = req.body;
    if (!text) return res.status(400).json({ error: "Task text is required" });
    const newTask = {
        id: Date.now(),
        text,
        category: category || "Personal",
        completed: false,
        remainingTime: remainingTime || 0,
        originalTime: remainingTime || 0,
        isRunning: false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.put('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const index = tasks.findIndex(t => t.id == id);
    if (index === -1) return res.status(404).json({ error: "Task not found" });
    tasks[index] = { ...tasks[index], ...req.body };
    res.json(tasks[index]);
});

app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const index = tasks.findIndex(t => t.id == id);
    if (index === -1) return res.status(404).json({ error: "Task not found" });
    tasks.splice(index, 1);
    res.status(204).send();
});

app.get('/api/categories', (req, res) => {
    res.json(categories);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});