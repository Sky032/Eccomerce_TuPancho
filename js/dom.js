// Aca guardamos todos los nodos

//Nodo general de la tienda
const contenedorTienda = document.getElementById('contenedorTienda');

//Nodos del Carrito
const contenedorCarrito = document.getElementById('contenedorCarrito');
const botonCarrito = document.getElementById("btnCarrito"); // este es el que esta en el header de la tienda
const badgeCarrito = document.getElementById('badgeCarrito');
const ABONAR = document.getElementById("ABONAR");
const vaciarCarrito = document.getElementById("cancelar")
const listaProductos = document.getElementById("listaProductos");

//Nodos del administrador de la tienda
const contenedorAdmin = document.getElementById('admin');
const selectEliminar = document.getElementById('eliminarProductos');
const btnEliminar = document.getElementById('btnEliminarProd');

//Nodos del login
const contenedorLogin = document.getElementById('login');
const inputUsuario = document.getElementById('usuario');
const inputClave = document.getElementById('clave');
const btnLogin = document.getElementById('btnLogin');
let errorLogin = document.getElementById('errorLogin');
const btnLogOut = document.getElementById('btnLogOut');
const divSession = document.getElementById('divSession');

//nodos register
const btnCrear = document.getElementById('btnCrear');
const contenedorCrear = document.getElementById('crear2');
const CrearBTNfinal = document.getElementById("CrearBTNfinal");
const inputNuevoUsuario = document.getElementById('NuevoUsuario');
const inputNuevaClave = document.getElementById('NuevaClave');

const gracias = document.getElementById("gracias")