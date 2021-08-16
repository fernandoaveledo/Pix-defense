const carrito = document.getElementById("carrito");
const productos = document.getElementById("lista-productos");
const listaProductos = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

cargarEventListeners();

function cargarEventListeners() {
  productos.addEventListener("click", comprarProducto);
  carrito.addEventListener("click", eliminarProducto);
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
  document.addEventListener("DOMContentLoaded", leerLocalStorage);
}

function comprarProducto(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const producto = e.target.parentElement.parentElement;
        leerDatosProducto(producto);
    }
}

function leerDatosProducto(producto){
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h4').textContent,
        precio: producto.querySelector('.precio span').textContent,
        id: producto.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(infoProducto);
}

function insertarCarrito(producto) {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>
        <img src="${producto.imagen}" width=100> 
    </td> 
    <td>${producto.titulo}</td>
    <td>${producto.precio}</td>
    <td>
        <a href="#" class="borrar-producto" data-id="${producto.id}">X</a>
    </td>
    `;
    listaProductos.appendChild(row);
    guardarProductoLocalStorage(producto);
}

function eliminarProducto(e) {
    e.preventDefault();

    let producto,
        productoId;
    
    if(e.target.classList.contains('borrar-producto')) {
        e.target.parentElement.parentElement.remove();
        producto = e.target.parentElement.parentElement;
        productoId = producto.querySelector('a').getAttribute('data-id');
    }
    eliminarProductoLocalStorage(productoId)
}

function vaciarCarrito(){
    while(listaProductos.firstChild){
        listaProductos.removeChild(listaProductos.firstChild);
    }
    vaciarLocalStorage();

    return false;
}

function guardarProductoLocalStorage(producto) {
    let productos;

    productos = obtenerProductosLocalStorage();
    productos.push(producto);

    localStorage.setItem('productos', JSON.stringify(productos));
}

function obtenerProductosLocalStorage() {
    let productosLS;

    if(localStorage.getItem('productos') === null) {
        productosLS = [];
    }else {
        productosLS = JSON.parse(localStorage.getItem('productos'));
    }
    return productosLS;
}

function leerLocalStorage() {
    let productosLS;

    productosLS = obtenerProductosLocalStorage();

    productosLS.forEach(function(producto){
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${producto.imagen}" width=100>
            </td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>
                <a href="#" class="borrar-producto" data-id="${producto.id}">X</a>
            </td>
        `;
        listaProductos.appendChild(row);
    });
}

function eliminarProductoLocalStorage(producto) {
    let productosLS;
    productosLS = obtenerProductosLocalStorage();

    productosLS.forEach(function(productoLS, index){
        if(productoLS.id === producto) {
            productosLS.splice(index, 1);
        }
    });

    localStorage.setItem('productos', JSON.stringify(productosLS));
}

function vaciarLocalStorage() {
    localStorage.clear();
}


//SELECTORES, ENTIDAD
class Item {
    constructor(buscador){
    this.buscador=buscador;

}
}

// VARIABLES
let buscar = $("#buscador").val()
let item= new Item(buscador)

//funciones
function imprimir(e){
    e.preventDefault
    let buscar = $("#buscador").val()

    let item= new Item(buscador)
console.log(item);
}

//eventos

$("buscar").click(imprimir)





//AJAX Y JSON
//console.log('correcto');
document.querySelector('#botonn').addEventListener('click', traerDatos)

function traerDatos() {
   // console.log('dentro del a funcaion');

    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'api.json', true);

    xhttp.send();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status==200){
            //console.log(this.responseText);
            let datos= JSON.parse(this.responseText)
                //console.log(datos);

            let res= document.querySelector('#res');
            res.innerHTML='';

            for(let item of datos) {
                //console.log(item);
                res.innerHTML += `
                <tr>
                <td>${item.titulo}</td>
                <td>${item.precio}</td>
                </tr>
                `
            }
        }
    }
}


//SUGERENCIA

const getValueInput = () =>{
    let inputValue = document.getElementById("buscador").value; 
    document.getElementById("valueInput").innerHTML = "Gracias por tu sugerencia! Sugeriste: " +inputValue; 
}



//JQEUERY
// $(function () {

//     $("#buscar").click(function(){
//         alert("Gracias por tu sugerencia")
//     })

// })

$(function(){

    $("#2nd").mouseenter(function(){
        $("#3rd").hide();
        $("#1st").hide();
    })

    $("#2nd").mouseleave(function(){
        $("#3rd").show();
        $("#1st").show();
    })
})
