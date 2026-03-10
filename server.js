const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/')));

const db = new sqlite3.Database('./orders.db');

db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT,
    phone TEXT,
    address TEXT,
    items TEXT,
    total_price INTEGER,
    date TEXT
)`);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/api/order', (req, res) => {
    const { name, phone, address, items, total } = req.body;
    const date = new Date().toLocaleString();
    
    db.run(`INSERT INTO orders (customer_name, phone, address, items, total_price, date) VALUES (?, ?, ?, ?, ?, ?)`,
        [name, phone, address, JSON.stringify(items), total, date],
        function(err) {
            if (err) return res.status(400).json({ error: err.message });
            res.json({ message: 'Замовлення отримано!', id: this.lastID });
        }
    );
});

app.get('/api/admin/orders', (req, res) => {
    db.all(`SELECT * FROM orders ORDER BY id DESC`, [], (err, rows) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json(rows);
    });
});

app.listen(port, () => {
    console.log(`Сервер працює на порту ${port}`);
});