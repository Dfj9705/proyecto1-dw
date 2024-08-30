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
            const td5 = document.createElement('td')
            const buttonQuitar = document.createElement('button')
            const inputCantidad = document.createElement('input')

            inputCantidad.type = 'number'
            inputCantidad.min = 1
            inputCantidad.value = p.cantidad
            buttonQuitar.textContent = "Quitar"
            buttonQuitar.classList.add('btn-danger')
            buttonQuitar.addEventListener('click', (e) => quitaProducto(p))
            inputCantidad.addEventListener('change', (e) => cambiarCantidad(e, p))
            td1.textContent = contador;
            td2.textContent = p.nombre
            td3.textContent = parseFloat(p.precio).toLocaleString('es-GT', {
                style: 'currency',
                currency: 'GTQ'
            });
            td4.appendChild(inputCantidad)
            totalPrecio += parseFloat(p.precio) * parseFloat(p.cantidad)
            td5.appendChild(buttonQuitar)
            tr.appendChild(td1)
            tr.appendChild(td2)
            tr.appendChild(td3)
            tr.appendChild(td4)
            tr.appendChild(td5)

            fragment.appendChild(tr)
            contador++
        })

    } else {
        const tr = document.createElement('tr')
        const td1 = document.createElement('td')
        td1.colSpan = 5
        td1.textContent = 'No hay productos agregados'
        tr.appendChild(td1)


        fragment.appendChild(tr)
    }
    console.log(totalPrecio);
    totalProductos = 0
    productos.forEach(p => {
        totalProductos += parseInt(p.cantidad)
    });
    tablaProductos.tBodies[0].appendChild(fragment)

}

const colocarCantidades = () => {
    console.log(totalPrecio);
    document.getElementById('spanProductosTotal').textContent = totalProductos
    document.getElementById('spanPrecioTotal').textContent = parseFloat(totalPrecio).toLocaleString('es-GT', {
        style: 'currency',
        currency: 'GTQ'
    });
}

const cambiarCantidad = (event, producto) => {
    console.log(producto);
    console.log(event.target.value)

    productos.forEach(p => {
        if (p.nombre == producto.nombre) {
            p.cantidad = event.target.value
        }
    })

    localStorage.removeItem('productos')
    localStorage.setItem('productos', JSON.stringify(productos))

    contarProductos()
    obtenerProductos()
    colocarCantidades()
}

const quitaProducto = (producto) => {

    console.log(productos);
    let newProductos = []
    productos.forEach(p => {
        if (p.nombre != producto.nombre) {
            newProductos.push(p)
        }
    })


    localStorage.removeItem('productos')
    localStorage.setItem('productos', JSON.stringify(newProductos))
    contarProductos()
    obtenerProductos()
    colocarCantidades()
}

obtenerProductos();
colocarCantidades();