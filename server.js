const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
// Роздаємо статичні файли (CSS, JS, картинки) з поточної папки
app.use(express.static(__dirname)); 

// Налаштування бази даних SQLite
const db = new sqlite3.Database('./orders.db');

// Створюємо таблицю замовлень, якщо її немає
db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT,
    phone TEXT,
    address TEXT,
    items TEXT,
    total_price INTEGER,
    date TEXT
)`);

// 1. ПРИЙОМ НОВОГО ЗАМОВЛЕННЯ
app.post('/api/order', (req, res) => {
    const { name, phone, address, items, total } = req.body;
    const date = new Date().toLocaleString();
    
    // Записуємо в базу (товари конвертуємо в JSON-рядок)
    db.run(`INSERT INTO orders (customer_name, phone, address, items, total_price, date) VALUES (?, ?, ?, ?, ?, ?)`,
        [name, phone, address, JSON.stringify(items), total, date],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ success: true, id: this.lastID });
        }
    );
});

// 2. ОТРИМАННЯ ЗАМОВЛЕНЬ ДЛЯ АДМІНКИ
app.get('/api/admin/orders', (req, res) => {
    db.all(`SELECT * FROM orders ORDER BY id DESC`, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Запускаємо сервер
app.listen(port, () => {
    console.log(`СерверFood Express запущено на порту ${port}`);
});