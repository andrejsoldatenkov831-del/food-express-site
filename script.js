// Ініціалізація кошика при завантаженні будь-якої сторінки
document.addEventListener('DOMContentLoaded', () => {
    updateCartVisuals();
});

/**
 * Додавання товару в кошик
 * @param {string} name - Назва страви
 * @param {number} price - Ціна
 */
function addToCart(name, price) {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    
    // Створюємо об'єкт товару з унікальним ID для можливості видалення саме цієї одиниці
    const newItem = {
        id: Date.now() + Math.random(),
        name: name,
        price: Number(price)
    };
    
    cart.push(newItem);
    sessionStorage.setItem('cart', JSON.stringify(cart));
    
    // Оновлюємо інтерфейс
    updateCartVisuals();
    
    // Невелика анімація або повідомлення для користувача
    console.log(`Додано: ${name}`);
}

/**
 * Видалення конкретного товару з кошика за його ID
 * @param {number} id - Унікальний ідентифікатор товару
 */
function removeFromCart(id) {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    
    // Фільтруємо масив, залишаючи всі товари, крім того, що видаляємо
    cart = cart.filter(item => item.id !== id);
    
    sessionStorage.setItem('cart', JSON.stringify(cart));
    
    // Оновлюємо інтерфейс на обох сторінках
    updateCartVisuals();
}

/**
 * Оновлення всіх візуальних елементів кошика на сторінці
 */
function updateCartVisuals() {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    
    // Елементи для сторінки Меню (st2.html)
    const menuList = document.getElementById('cart-list');
    const menuTotal = document.getElementById('total-val');
    const checkoutBtn = document.getElementById('checkout-link');

    // Елементи для сторінки Оформлення (st3.html)
    const checkoutList = document.getElementById('cart-items-display');
    const checkoutTotal = document.getElementById('total-price-display');

    let totalSum = 0;

    // 1. Логіка для сторінки МЕНЮ
    if (menuList) {
        menuList.innerHTML = '';
        if (cart.length === 0) {
            menuList.innerHTML = '<p style="color: #aaa; text-align: center;">Кошик порожній</p>';
            if (checkoutBtn) checkoutBtn.style.display = 'none';
        } else {
            cart.forEach(item => {
                const div = document.createElement('div');
                div.className = 'cart-item';
                div.style.cssText = "display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid #f0f0f0;";
                div.innerHTML = `
                    <div>
                        <div style="font-weight:bold">${item.name}</div>
                        <div style="font-size:14px; color:#ff5c5c">${item.price} грн</div>
                    </div>
                    <button onclick="removeFromCart(${item.id})" style="background:#fee; color:#ff5c5c; border:none; width:28px; height:28px; border-radius:50%; cursor:pointer; font-weight:bold;">×</button>
                `;
                menuList.appendChild(div);
                totalSum += item.price;
            });
            if (checkoutBtn) checkoutBtn.style.display = 'block';
        }
        if (menuTotal) menuTotal.innerText = totalSum;
    }

    // 2. Логіка для сторінки ОФОРМЛЕННЯ
    if (checkoutList) {
        checkoutList.innerHTML = '';
        let currentSum = 0;
        if (cart.length === 0) {
            checkoutList.innerHTML = '<p style="text-align:center; opacity:0.7;">Кошик порожній</p>';
        } else {
            cart.forEach(item => {
                checkoutList.innerHTML += `
                    <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                        <span>${item.name}</span>
                        <span>${item.price} грн</span>
                    </div>`;
                currentSum += item.price;
            });
        }
        if (checkoutTotal) checkoutTotal.innerText = `Разом: ${currentSum} грн`;
    }
}