'use strict';

// Constantes
const btn = document.querySelector('.js-button');
const input = document.querySelector('.js-input');
const listProducts = document.querySelector('.js-list-products');
const url = 'https://fakestoreapi.com/products';
const btnClear = document.querySelector('.js-btnclear');

// Variables
let products = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Funciones 

// Pintar los productos en el HTML
function renderProducts(products) {
    for (let product of products) {
        const boxProduct = document.createElement('div');
        boxProduct.className = 'boxProduct';

        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.title;
        img.className = 'img';

        const h3 = document.createElement('h3');
        h3.innerText = product.title;

        const price = document.createElement('p');
        price.innerText = product.price + '€';

        const stars = document.createElement('p');
        stars.innerText = product.rating.rate + '⭐';

        const btnBuy = document.createElement('button');
        btnBuy.innerText = 'Comprar';
        btnBuy.className = 'btn-buy';
        btnBuy.setAttribute('data-id', product.id);
        btnBuy.addEventListener('click', (event) => toggleCart(product, event.target));

        updateButton(btnBuy, product);

        boxProduct.appendChild(img);
        boxProduct.appendChild(h3);
        boxProduct.appendChild(btnBuy);
        boxProduct.appendChild(price);
        boxProduct.appendChild(stars);
        listProducts.appendChild(boxProduct);
    }
}
// actualiza el boton de eliminar/comprar
function updateButton(button, product) {
    const exists = cart.find(item => item.id === product.id) !== undefined; // Busca si el producto está en el carrito.

    if (exists) {
        button.innerText = 'Eliminar';
        button.classList.add('added');
    } else {
        button.innerText = 'Comprar';
        button.classList.remove('added');
    }
}

// Cambiar el botón de comprar a eliminar
function toggleCart(product, button) {
    const exists = cart.find(item => item.id === product.id);

    if (!exists) { 
        // Si el producto NO está en el carrito, lo agregamos con cantidad 1
        cart.push({...product, quantity: 1});
    } else {
        // Si ya está en el carrito, lo eliminamos
        cart = cart.filter(item => item.id !== product.id);
    }

    updateCartStorage();
    renderCart();
    updateButton(button, product); // Asegurar que el botón 'Comprar/Eliminar' se actualice
}
// Actualiza la cantidad de productos en el carrito
function updateQuantity(productId, action) {
    const product = cart.find(item => item.id === productId);

    if (product) {
        if (action === 'increase') {
            product.quantity++;
        } else if (action === 'decrease') {
            product.quantity--;

            // Si la cantidad es 0, eliminar el producto
            if (product.quantity === 0) {
                cart = cart.filter(item => item.id !== productId);
            }
        }
        updateCartStorage();
        renderCart();
    }
}

// Añadir el producto al carrito
function renderCart() {
    const cartList = document.querySelector('.js-list-cart');
    const totalpriceProduct = document.querySelector('.js-total');
    cartList.innerHTML = '';
    let total = 0;

    cart.forEach(product => {
        const cartItem = document.createElement('li');
        cartItem.className = 'boxProductcart';

        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.title;
        img.className = 'img';

        const title = document.createElement('h3');
        title.innerText = product.title;

        const price = document.createElement('p');
        price.innerText = product.price + '€';

        const div = document.createElement('div');
        div.className = 'div';

        const quantity = document.createElement('span');
        quantity.innerText = `Cantidad: ${product.quantity} Total: ${product.price * product.quantity}€`;

        total += product.price * product.quantity;

        const add = document.createElement('button');
        add.innerText = '+';
        add.className = 'btn-more';
        add.addEventListener('click', () => updateQuantity(product.id, 'increase'));

        const remove = document.createElement('button');
        remove.innerText = '-';
        remove.className = 'btn-remove2';
        remove.addEventListener('click', () => updateQuantity(product.id, 'decrease'));

        const btnRemove = document.createElement('button');
        btnRemove.innerText = 'Quitar';
        btnRemove.className = 'btn-remove';
        btnRemove.addEventListener('click', () => toggleCart(product, document.querySelector(`[data-id='${product.id}']`)));

        cartItem.appendChild(img);
        cartItem.appendChild(title);
        cartItem.appendChild(price);
        cartItem.appendChild(btnRemove);
        cartItem.appendChild(quantity);
        cartItem.appendChild(div);

        div.appendChild(add);
        div.appendChild(remove);
        cartList.appendChild(cartItem);
    });

    totalpriceProduct.innerText = `Total: ${total.toFixed(2)}€`;
}

// Función para vaciar el carrito
function clearCart() {
    cart = [];
    updateCartStorage();

    renderCart();
    document.querySelectorAll('.btn-buy').forEach(button => { // Recorre todos los botones con la clase de btn-buy y los cambia a comprar
        button.innerText = 'Comprar';
        button.classList.remove('added');
    });
}

// Funciones manejadoras

// Función para manejar el evento mientras busca en el input
function handleSearch(event) {
    const valueSearch = event.target.value.toLowerCase();

    // Pinta en el momento que el usuario escribe
    const resultado = products.filter(productItem => 
        productItem.title.toLowerCase().includes(valueSearch)
    );

    listProducts.innerHTML = ''; 
    renderProducts(resultado);
}

// Almacenar información en el local storage
function updateCartStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Eventos

fetch(url)
    .then(response => response.json())
    .then(data => {
        products = data;
        console.log(products);
        renderProducts(products);
    })
    .catch(error => console.error('Error al cargar productos:', error)); 

input.addEventListener('input', handleSearch);
document.addEventListener('DOMContentLoaded', renderCart); // El DOM permite que se cargue el HTML antes de cargar renderCart, para evitar que salga la lista vacía.  
btnClear.addEventListener('click', clearCart);
