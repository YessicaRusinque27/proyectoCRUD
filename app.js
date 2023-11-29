let ProductosVendidos = [];

const objProductos = {
    id: '',
    producto: '',
    Compra: '',
    venta: ''
}

let editando = false;

const formulario = document.querySelector('#formulario');
const productoInput = document.querySelector('#producto'); // Corregido el ID aquí
const compraInput = document.querySelector('#Compra');
const ventaInput = document.querySelector('#Venta'); // Corregido el ID aquí
const btnAgregarInput = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if (productoInput.value === '' || ventaInput.value === '') {
        alert('Todos los campos se deben llenar');
        return;
    }

    if (editando) {
        editarProductosVendidos();
        editando = false;
    } else {
        objProductos.id = Date.now();
        objProductos.producto = productoInput.value;
        objProductos.Compra = compraInput.value;
        objProductos.venta = ventaInput.value;

        agregarProductosVendidos();
    }
}

function agregarProductosVendidos() {
    ProductosVendidos.push({ ...objProductos });
    mostrarProductosVendidos();
    formulario.reset();
    limpiarObjeto();
}

function limpiarObjeto() {
    objProductos.id = '';
    objProductos.producto = '';
    objProductos.Compra = '';
    objProductos.venta = '';
}

function mostrarProductosVendidos() {
    limpiarHTML();
    const divProductos = document.querySelector('.div-productos');

    ProductosVendidos.forEach(productoSeleccionado => {
        const { id, producto, Compra, venta } = productoSeleccionado;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${producto} - ${Compra} - ${venta} - `;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarProductosVendidos(productoSeleccionado);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.appendChild(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarProductosVendidos(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.appendChild(eliminarBoton);

        const hr = document.createElement('hr');

        divProductos.appendChild(parrafo);
        divProductos.appendChild(hr);
    });
}

function cargarProductosVendidos(productoSeleccionado) {
    const { id, producto, Compra, venta } = productoSeleccionado;

    productoInput.value = producto;
    compraInput.value = Compra;
    ventaInput.value = venta;

    objProductos.id = id;
    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    editando = true;
}

function editarProductosVendidos() {
    objProductos.producto = productoInput.value;
    objProductos.Compra = compraInput.value;
    objProductos.venta = ventaInput.value;

    ProductosVendidos.forEach(producto => {
        if (producto.id === objProductos.id) {
            producto.id = objProductos.id;
            producto.producto = objProductos.producto;
            producto.Compra = objProductos.Compra;
            producto.venta = objProductos.venta;
        }
    });

    limpiarHTML();
    mostrarProductosVendidos();
    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';
    editando = false;
}

function eliminarProductosVendidos(id) {
    ProductosVendidos = ProductosVendidos.filter(producto => producto.id !== id);

    limpiarHTML();
    mostrarProductosVendidos();
}

function limpiarHTML() {
    const divProductos = document.querySelector('.div-productos');
    while (divProductos.firstChild) {
        divProductos.removeChild(divProductos.firstChild);
    }
}
