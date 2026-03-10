window.addToCart = function(name, price) {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    cart.push({ name: name, price: Number(price) });
    sessionStorage.setItem('cart', JSON.stringify(cart));
    alert(name + " додано!");
};