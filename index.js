import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let tasks = [];
let categories = ["Personal", "Work", "Urgent"];

function findTaskIndex(id) {
    return tasks.findIndex(t => t.id === id);
}

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
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

app.put('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = findTaskIndex(id);
    if (index === -1) return res.status(404).json({ error: "Task not found" });
    tasks[index] = { ...tasks[index], ...req.body };
    res.json(tasks[index]);
});

app.delete('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = findTaskIndex(id);
    if (index === -1) return res.status(404).json({ error: "Task not found" });
    const deleted = tasks.splice(index, 1);
    res.json(deleted[0]);
});

app.get('/categories', (req, res) => {
    res.json(categories);
});

app.listen(PORT, () => {
    console.log(`API running at http://localhost:${PORT}`);
});