

# Compra Online Viewer

Este proyecto es una aplicación web que muestra productos de una tienda y permite al usuario agregar o quitar productos de un carrito de compras. Además, almacena los datos en `localStorage` para mantener el estado del carrito.

## 🚀 Características

- Obtiene productos desde `FakeStoreAPI`.
- Renderiza productos en el DOM con imagen, precio y calificación.
- Permite buscar productos dinámicamente.
- Agregar y quitar productos del carrito.
- Actualiza cantidades de productos dentro del carrito.
- Persistencia del carrito utilizando `localStorage`.

Para arrancar el proyecto desde visual hacer npm run dev.

- Uso
Al abrir la página, se cargarán los productos de la API.

Puedes buscar un producto utilizando el input de búsqueda.

Para agregar un producto al carrito, haz clic en el botón "Comprar".

Para quitarlo, haz clic en "Eliminar" dentro del carrito.

Puedes aumentar/disminuir la cantidad de cada producto.

Presiona el botón "Vaciar carrito" para eliminar todos los productos.

- LocalStorage
El carrito de compras se guarda en localStorage, permitiendo que los datos persistan incluso después de recargar la página.

API Utilizada
Los productos se obtienen desde https://fakestoreapi.com/products.