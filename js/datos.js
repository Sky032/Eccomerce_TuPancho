let productos = [
    {id:'0', tipo: "Super Pancho", modelo: "EEUU", precio: 800, img: "img/pancho.jpg" },
    {id:'1', tipo: "hamburguesa", modelo: "Mega", precio: 1000, img: "img/hamburguesa.jpg" },
    {id:'2', tipo: "ensalada", modelo: "Ceasar", precio: 1000, img: "img/ceasar.jpg" },
    {id:'3', tipo: "kit salsas", modelo: "Especiales", precio: 200, img: "img/salsas.jpg" },
];

const usuarios = [
    { nombre: "martin", clave: "123", tipo: "admin" },
    { nombre: "maria", clave: "123", tipo: "comun" },
];

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
