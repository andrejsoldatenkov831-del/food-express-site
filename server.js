const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

const db = new sqlite3.Database('./orders.db');
db.run(`CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY AUTOINCREMENT, customer_name TEXT, phone TEXT, address TEXT, items TEXT, total_price INTEGER, date TEXT)`);

// Маршрути для сторінок
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/menu', (req, res) => res.sendFile(path.join(__dirname, 'st2.html')));

app.post('/api/order', (req, res) => {
    const { name, phone, address, items, total } = req.body;
    db.run(`INSERT INTO orders (customer_name, phone, address, items, total_price, date) VALUES (?, ?, ?, ?, ?, ?)`,
        [name, phone, address, JSON.stringify(items), total, new Date().toLocaleString()],
        function(err) { err ? res.status(500).send(err) : res.json({ success: true }); }
    );
});

app.listen(port, () => console.log(`🚀 Сервер готовий!`));