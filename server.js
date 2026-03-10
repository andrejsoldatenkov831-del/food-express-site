const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

const db = new sqlite3.Database('./orders.db');

// Головна сторінка
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

// Сторінка МЕНЮ (тепер /menu буде відкривати st2.html)
app.get('/menu', (req, res) => res.sendFile(path.join(__dirname, 'st2.html')));

// Сторінка АДМІНА
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'admin.html')));

// API для замовлень
app.get('/api/admin/orders', (req, res) => {
    db.all(`SELECT * FROM orders ORDER BY id DESC`, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.listen(port, () => console.log(`🚀 Сервер запущено!`));