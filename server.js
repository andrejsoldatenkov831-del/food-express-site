const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

const db = new sqlite3.Database('./orders.db');

// Створення таблиці
db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT, phone TEXT, address TEXT, items TEXT, total_price INTEGER, date TEXT
)`);

// МАРШРУТИ ДЛЯ СТОРІНОК
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/menu', (req, res) => res.sendFile(path.join(__dirname, 'st2.html')));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'admin.html'))); // Прямий вхід

// API ДЛЯ РОБОТИ З ДАНИМИ
app.get('/api/admin/orders', (req, res) => {
    db.all(`SELECT * FROM orders ORDER BY id DESC`, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.delete('/api/admin/orders/:id', (req, res) => {
    db.run(`DELETE FROM orders WHERE id = ?`, req.params.id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

app.post('/api/order', (req, res) => {
    const { name, phone, address, items, total } = req.body;
    const date = new Date().toLocaleString('uk-UA');
    db.run(`INSERT INTO orders (customer_name, phone, address, items, total_price, date) VALUES (?, ?, ?, ?, ?, ?)`,
        [name, phone, address, JSON.stringify(items), total, date],
        function(err) {
            if (err) return res.status(500).send(err);
            res.json({ success: true, id: this.lastID });
        }
    );
});

app.listen(port, () => console.log(`🚀 Server on port ${port}`));