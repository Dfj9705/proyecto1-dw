let productos = JSON.parse(localStorage.getItem('productos')) ? JSON.parse(localStorage.getItem('productos')) : [];

function drag(ev) {
    ev.stopPropagation();
    ev.target.style.cursor = 'grabbing'
    ev.dataTransfer.setData("text", ev.target.id);
    ev.dataTransfer.setData("nombre", ev.target.dataset.nombre);
    ev.dataTransfer.setData("precio", ev.target.dataset.precio);
}


function allowDrop(ev) {
    ev.preventDefault();
}


function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    const element = document.getElementById(data)
    if (!element.draggable) {
        return
    }
    element.style.cursor = 'grab'
    const src = document.getElementById(data).firstElementChild.src
    const img = document.createElement('img')
    img.src = src
    img.style.width = '45px'
    img.style.margin = 0

    let nuevoProducto = {
        id: productos ? productos.length + 1 : 1,
        nombre: ev.dataTransfer.getData('nombre'),
        precio: ev.dataTransfer.getData('precio')
    }

    productos = [...productos, nuevoProducto]

    localStorage.setItem('productos', JSON.stringify(productos))
    contarProductos();
    ev.target.appendChild(img);
}