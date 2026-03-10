const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

const db = new sqlite3.Database('./orders.db');

// Маршрут для адмінки
app.get('/admin', (req, res) => {
    const adminPath = path.join(__dirname, 'admin.html');
    res.sendFile(adminPath, (err) => {
        if (err) {
            console.error("Помилка: Файл admin.html не знайдено!", err);
            res.status(404).send("Сторінка адміна не знайдена. Перевір назву файлу!");
        }
    });
});

// Решта API (замовлення та видалення)
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

app.listen(port, () => console.log(`🚀 Сервер на порту ${port}`));