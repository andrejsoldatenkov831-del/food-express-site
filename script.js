function addToCart(name, price) {
    // Отримуємо список або створюємо порожній масив
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    
    // Додаємо об'єкт товару
    cart.push({ name: name, price: Number(price) });
    
    // Зберігаємо
    sessionStorage.setItem('cart', JSON.stringify(cart));
    
    alert("Додано: " + name);
}