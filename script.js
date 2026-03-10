window.addToCart = function(name, price) {
    let cart = [];
    try {
        cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    } catch (e) {
        cart = [];
    }

    cart.push({ name: name, price: Number(price) });
    sessionStorage.setItem('cart', JSON.stringify(cart));
    
    alert(name + " додано у кошик!");
};