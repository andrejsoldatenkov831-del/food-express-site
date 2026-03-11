const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

const db = new sqlite3.Database('./orders.db', (err) => {
    if (err) console.error('Помилка БД:', err.message);
    else console.log('✅ База даних готова до роботи');
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_name TEXT,
        phone TEXT,
        address TEXT,
        items TEXT,
        total_price INTEGER,
        date TEXT
    )`);
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/menu', (req, res) => {
    res.sendFile(path.join(__dirname, 'st2.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});


app.get('/api/admin/orders', (req, res) => {
    db.all(`SELECT * FROM orders ORDER BY id DESC`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/api/order', (req, res) => {
    const { name, phone, address, items, total } = req.body;
    
    if (!name || !phone || !items) {
        return res.status(400).json({ success: false, error: "Missing data" });
    }

    const date = new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kyiv' });
    const sql = `INSERT INTO orders (customer_name, phone, address, items, total_price, date) VALUES (?, ?, ?, ?, ?, ?)`;
    const params = [name, phone, address, JSON.stringify(items), total, date];

    db.run(sql, params, function(err) {
        if (err) {
            console.error('Помилка запису:', err.message);
            return res.status(500).json({ success: false });
        }
        res.json({ success: true, id: this.lastID });
    });
});

app.delete('/api/admin/orders/:id', (req, res) => {
    db.run(`DELETE FROM orders WHERE id = ?`, req.params.id, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

app.listen(port, () => {
    console.log(`🚀 Сервер FoodExpress працює на порту ${port}`);
});