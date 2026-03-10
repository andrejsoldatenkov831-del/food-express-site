// window.addToCart робить функцію глобальною для кнопок у HTML
window.addToCart = function(name, price) {
    let cart = [];
    try {
        // Отримуємо поточний кошик із тимчасової пам'яті сесії
        cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    } catch (e) {
        cart = []; // Якщо помилка — створюємо порожній
    }

    // Додаємо новий товар (перетворюємо ціну на число)
    cart.push({
        name: name,
        price: Number(price)
    });

    // Зберігаємо назад у сесію
    sessionStorage.setItem('cart', JSON.stringify(cart));

    console.log("Додано:", name, "Всього:", cart.length);
    
    // Візуальне підтвердження (можна замінити на красивіше спливаюче вікно)
    alert(`${name} додано до кошика!`);
};