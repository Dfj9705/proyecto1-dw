const tablaProductos = document.getElementById('tablaProductos')
let productos = [];

let totalProductos = 0;
let totalPrecio = 0;
const obtenerProductos = () => {
    productos = JSON.parse(localStorage.getItem('productos')) ? JSON.parse(localStorage.getItem('productos')) : []

    tablaProductos.tBodies[0].innerHTML = ''
    const fragment = document.createDocumentFragment();
    let contador = 1;
    totalPrecio = 0;
    if (productos.length > 0) {
        productos.forEach(p => {
            const tr = document.createElement('tr')
            const td1 = document.createElement('td')
            const td2 = document.createElement('td')
            const td3 = document.createElement('td')
            const td4 = document.createElement('td')
            const buttonQuitar = document.createElement('button')
            buttonQuitar.textContent = "Quitar"
            buttonQuitar.classList.add('btn-danger')
            buttonQuitar.addEventListener('click', (e) => quitaProducto(p.id))

            td1.textContent = contador;
            td2.textContent = p.nombre
            td3.textContent = parseFloat(p.precio).toLocaleString('es-GT', {
                style: 'currency',
                currency: 'GTQ'
            });
            totalPrecio += parseFloat(p.precio)
            td4.appendChild(buttonQuitar)
            tr.appendChild(td1)
            tr.appendChild(td2)
            tr.appendChild(td3)
            tr.appendChild(td4)

            fragment.appendChild(tr)
            contador++
        })

    } else {
        const tr = document.createElement('tr')
        const td1 = document.createElement('td')
        td1.colSpan = 4
        td1.textContent = 'No hay productos agregados'
        tr.appendChild(td1)


        fragment.appendChild(tr)
    }
    console.log(totalPrecio);
    totalProductos = productos ? productos.length : 0
    tablaProductos.tBodies[0].appendChild(fragment)

}

const colocarCantidades = () => {
    document.getElementById('spanProductosTotal').textContent = totalProductos
    document.getElementById('spanPrecioTotal').textContent = parseFloat(totalPrecio).toLocaleString('es-GT', {
        style: 'currency',
        currency: 'GTQ'
    });
}

const quitaProducto = (id) => {
    console.log(id);
    console.log(productos);

    productos = productos.filter(p => p.id != id)
    localStorage.removeItem('productos')
    localStorage.setItem('productos', JSON.stringify(productos))
    contarProductos()
    obtenerProductos()
    colocarCantidades()
}

obtenerProductos();
colocarCantidades();