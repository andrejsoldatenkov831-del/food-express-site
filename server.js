// 1. Функція додавання товару в кошик
window.addToCart = function(name, price) {
    // Отримуємо поточний кошик з пам'яті або створюємо порожній масив, якщо його ще немає
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Додаємо новий об'єкт товару
    cart.push({
        name: name,
        price: Number(price) // Перетворюємо на число, щоб потім легко рахувати суму
    });

    // Зберігаємо оновлений масив назад у LocalStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Візуальне підтвердження
    console.log("Товар додано в кошик:", name, cart);
    alert(`${name} додано до кошика!`);

    // Оновлюємо лічильник на іконці кошика (якщо вона є)
    updateCartCount();
};

// 2. Функція для оновлення кількості товарів (цифра біля іконки кошика)
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const countElement = document.getElementById('cart-count');
    
    if (countElement) {
        countElement.innerText = cart.length;
    }
}

// 3. Функція для очищення кошика (якщо знадобиться)
window.clearCart = function() {
    localStorage.removeItem('cart');
    updateCartCount();
    console.log("Кошик очищено");
};

// 4. Запускаємо перевірку лічильника відразу при завантаженні будь-якої сторінки
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});