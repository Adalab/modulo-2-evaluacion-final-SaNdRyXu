'use strict';



// Constantes
const btn = document.querySelector('.js-button');
const input = document.querySelector('.js-input');
const listProducts = document.querySelector('.js-list-products');
const url = 'https://fakestoreapi.com/products';


//variables

let products = [];



//funciones 
//pintar los productos en el HTML
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

        const btnBuy = document.createElement('button');
        btnBuy.innerText = 'Comprar';
        btnBuy.className = 'btn-buy';
        btnBuy.addEventListener('click', (event) => addToCart(product, event.target));
        
        boxProduct.appendChild(img);
        boxProduct.appendChild(h3);
        boxProduct.appendChild(btnBuy);
        boxProduct.appendChild(price);
        listProducts.appendChild(boxProduct);
    }
}

//funcion para manejar el evento de click en el boton de comprar

function addToCart(product, button) {
    const cartList = document.querySelector('.js-list-cart');

    // Crear un nuevo elemento en el carrito con la info del producto
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

    // Botón para eliminar el producto
    const btnRemove = document.createElement('button');
    btnRemove.innerText = 'Quitar';
    btnRemove.className = 'btn-remove';
    btnRemove.addEventListener('click', () => removeFromCart(cartItem, button));

    
    cartItem.appendChild(img);
    cartItem.appendChild(title);
    cartItem.appendChild(price);
    cartItem.appendChild(btnRemove);

    // Agregar el nuevo producto a la lista del carrito
    cartList.appendChild(cartItem);

    // Cambiar el estado del botón comprar
    button.innerText = 'Añadido';
    button.classList.add('added');
    button.disabled = true; //apagamos el boton para evitar que se vuelva a agregar

}
//funcion para eliminar el producto del carrito
function removeFromCart(cartItem, button) {
    cartItem.remove(); //  Elimina el producto del carrito

    // Restaurar el botón en la tienda
    button.innerText = 'Comprar';
    button.classList.remove('added');
    button.disabled = false; // ✅ Permite volver a agregarlo
}



//funciones manejadoras

//funcion para manejar el evento mientras busca en el input
function handleSearch(event) {
    const valueSearch = event.target.value.toLowerCase();

    // pinta en el momento que el usuario escribe
    const resultado = products.filter(productItem => 
        productItem.title.toLowerCase().includes(valueSearch)
    );

    listProducts.innerHTML = ""; 
    renderProducts(resultado);
}
// no esta en uso porque esta la funcion handleSearch.
function handleClick(event){ 
    event.preventDefault(); 
    const valueSearch = input.value.toLowerCase(); 
    const resultado = products.filter(productItem => productItem.title.toLowerCase().includes(valueSearch.toLowerCase())); console.log(resultado);
    listProducts.innerHTML = '';
    renderProducts(resultado);
    input.value = ''; 
};


//Almacenar informacion en el local storage


 //mandar datos a la API


 //eventos

 fetch(url)
    .then((response) => response.json())
    .then((data) => {
        products = data;
        console.log(products);
        renderProducts(products);
    });


input.addEventListener('input', handleSearch);

