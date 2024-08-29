const spanLugar = document.getElementById('lugar')


const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(`Latitud: ${latitude}, Longitud: ${longitude}`);
    obtenerPais(latitude, longitude); // Llamar a la función para obtener el país
}

const error = () => {
    console.log("No se pudo obtener la ubicación.");
}

const obtenerPais = (lat, lng) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            spanLugar.textContent = `${data.address.district}, ${data.address.city}, ${data.address.country}`
            // console.log(data);
        })
        .catch(error => console.log("Error en la petición:", error));
}


if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
} else {
    console.log("La geolocalización no es soportada por este navegador.");
}

const contarProductos = () => {
    let productos = JSON.parse(localStorage.getItem('productos'))
    let cantidad = productos ? productos.length : 0
    document.getElementById('contador').innerText = cantidad
}

contarProductos();
