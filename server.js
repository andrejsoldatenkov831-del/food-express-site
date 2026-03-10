const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname)); 

// Головна сторінка
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Обробка замовлення (проста версія для тесту)
app.post('/api/order', (req, res) => {
    console.log("Отримано замовлення:", req.body);
    res.json({ success: true });
});

app.listen(port, () => console.log(`Server live on port ${port}`));