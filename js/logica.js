if (!localStorage.getItem('productos')) localStorage.setItem('productos', JSON.stringify(productos));
if (!localStorage.getItem('usuarios')) localStorage.setItem('usuarios', JSON.stringify(usuarios));
//Definimos nuestras funciones a utilizar en la tienda




const renderizarTienda = (objetoProductos) => {

  
  contenedorTienda.innerHTML = '';

  for (const producto of objetoProductos) {

    //Creamos los elementos HTML
    const divProducto = document.createElement('div');
    const imgProducto = document.createElement('img');
    const nombreProducto = document.createElement('h2');
    const precioProducto = document.createElement('h3');
    const botonComprar = document.createElement('button');

    //Les agregamos los estilos asignandoles clases de css
    divProducto.className = 'card';
    imgProducto.className = 'card-img-top';
    nombreProducto.className = 'nombre-producto';
    precioProducto.className = 'card-precio';
    botonComprar.className = 'btn btn-primary';

    //Le agregamos el contenido a los elementos creados y el id a los que vamos a necesitar despues
    imgProducto.src = producto.img;
    nombreProducto.append(producto.modelo);
    precioProducto.append(`$ ${producto.precio}`);
    botonComprar.append('Comprar');
    botonComprar.id = producto.id;

    botonComprar.onclick = () => {
      const productoComprado = productos.find(producto => producto.id === botonComprar.id);
      let carrito = JSON.parse(localStorage.getItem("carrito"));
      if (carrito == null) {carrito = []}; 
      carrito.push({ nombre: productoComprado.modelo, precio: productoComprado.precio });
      localStorage.setItem("carrito", JSON.stringify(carrito));
      badgeCarrito.innerHTML = carrito.length;
      Toastify({
        text: "agregado al Carrito",
        duration: 2000,
        gravity: "top",
        position: "right",
        className: "notificacion comprado"
      }).showToast();
    }

    //Agregamos los elementos creados a su elemento contenedor que es divProducto
    divProducto.append(imgProducto, nombreProducto, precioProducto, botonComprar);
    
    //Le agregamos al contenedor de la tienda cada uno de los divProducto
    contenedorTienda.append(divProducto);


    const option = document.createElement('option');
    option.value = producto.id;
    option.text = producto.modelo;
    selectEliminar.append(option)

  }

}


const mostrarCarrito = () => {
  
  const carrito = JSON.parse(localStorage.getItem("carrito"))
  listaProductos.innerHTML = ""
  
  for (const producto of carrito) {
    const nombreProducto = `<h4>Producto : ${producto.nombre}</h4>`
    const precioProducto = `<h4>Precio : ${producto.precio}</h4>`
    listaProductos.innerHTML += nombreProducto
    listaProductos.innerHTML += precioProducto
  }

  const total = carrito.reduce((accumulador, producto) => accumulador + producto.precio, 0);
  listaProductos.append(`Total Compra :  ${total}`);
  contenedorTienda.className += ' hidden';
  contenedorCarrito.classList.remove("hidden")
  contenedorCarrito.append(ABONAR)
}


const eliminarProducto = (productoId) => {
  selectEliminar.innerHTML = '';
  const productos = JSON.parse(localStorage.getItem("productos"))
  productosNuevo = productos.filter(producto => producto.id !== productoId);
  localStorage.setItem('productos', JSON.stringify(productosNuevo))
  renderizarTienda(JSON.parse(localStorage.getItem('productos')))


}

const login = () => {
  const usuarios = JSON.parse(localStorage.getItem("usuarios"));
  const usuarioLogueado = usuarios.find(usuario => usuario.nombre === inputUsuario.value)
  errorLogin.innerHTML = ""

  !usuarioLogueado ? errorLogin.append('El usuario ingresado no existe') : usuarioLogueado.clave === inputClave.value ? loginCorrecto(usuarioLogueado) : (errorLogin.innerHTML = "" , errorLogin.append('La clave ingresada es incorrecta'))  
}

const loginAdmin = ()=>{

  divSession.classList.remove('hidden')
  contenedorAdmin.classList.remove("hidden");
  botonCarrito.classList.add('hidden');
}

const loginUser = () => {
  contenedorAdmin.classList.add("hidden");
  botonCarrito.classList.remove('hidden');
  divSession.classList.remove('hidden')

}

const loginCorrecto = (usuario) => {
  
  errorLogin.classList.add('hidden')
  renderizarTienda(JSON.parse(localStorage.getItem('productos')))
  contenedorTienda.classList.remove("hidden");
  contenedorLogin.classList.add('hidden');
  localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
  usuario.tipo === 'admin' ? loginAdmin() : loginUser();
  usuario.tipo === 'admin' ? (contenedorAdmin.classList.remove("hidden") , btnCarrito.classList.add('hidden')) : (contenedorAdmin.classList.add("hidden") , btnCarrito.classList.remove('hidden'));
  let carrito = JSON.parse(localStorage.getItem("carrito"));
  if (carrito == null) {carrito = []};
  badgeCarrito.innerHTML = carrito.length; 
}
const procesoCrear = () => {
  contenedorLogin.classList.add('hidden');
  contenedorCrear.classList.remove('hidden');
}

//Cuando presiono boton Crear se genera un push al array de usuarios
const procesoCrearFinal = () => {
  switch (inputNuevoUsuario.value && inputNuevaClave.value) {
    case "":
      alert("No es posible crear un USUARIO/CLAVE en vacio");
      break;
  
    default:
      usuarios.push({nombre:inputNuevoUsuario.value, clave: inputNuevaClave.value, tipo: "comun"});
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      contenedorLogin.classList.remove('hidden');
      contenedorCrear.classList.add('hidden');
      inputNuevoUsuario.value = "";
      inputNuevaClave.value = "";
      break;
  }
};

procesoVaciarCarrito = () => {
  if (carrito !== null) {carrito = []};
  localStorage.setItem('carrito', JSON.stringify(carrito));
  contenedorCarrito.className += ' hidden';
  contenedorTienda.classList.remove("hidden");
  badgeCarrito.innerHTML = carrito.length;
}


// SWEET ALERT para abonar

const abonarFuncion = () => {
  swal("¿Desea confirmar su compra?", {
    buttons: {
      cancel: "Volver",
      
      catch: {
        text: "Si",
        value: "catch",
      },
      defeat: {
        text: "No, Vaciar Carrito",
        value: "vaciar"
      }
    },
  })
  .then((value) => {
    switch (value) {
     case "vaciar":
        swal("Vaciaremos su carrito", "vuelva a intentarlo", "warning");
        procesoVaciarCarrito();
        break;
   
     case "catch":
        swal("Muchas Gracias!!", "Su pedido sera preparado y lo esperamos pronto por el local", "success");
        contenedorTienda.className += ' hidden';
        contenedorCarrito.className += " hidden";
        divSession.className += " hidden";
        gracias.classList.remove("hidden");
        if (carrito !== null) {carrito = []};
        localStorage.setItem('carrito', JSON.stringify(carrito));
        break;
   
     default:
        swal("Lo esperaremos con ansias...")
        contenedorCarrito.className += ' hidden';
        contenedorTienda.classList.remove("hidden");
        break;
    }
  });
}


//EVENTOS

btnLogin.onclick = login;

btnEliminar.onclick = () => eliminarProducto(selectEliminar.value);

btnCarrito.onclick = mostrarCarrito;

btnCrear.onclick = procesoCrear;

CrearBTNfinal.onclick = procesoCrearFinal;

btnLogOut.onclick = () =>{
  localStorage.removeItem('usuarioLogueado');
  contenedorAdmin.classList.add("hidden");
  botonCarrito.classList.add('hidden');
  contenedorCarrito.classList.add("hidden");
  contenedorTienda.classList.add("hidden");
  contenedorLogin.classList.remove('hidden');
  divSession.classList.add("hidden");

  // window.location.reload()
}; 

ABONAR.onclick = abonarFuncion;

vaciarCarrito.onclick = procesoVaciarCarrito;


//Si hay un usuario logueado llamamos a login
localStorage.getItem('usuarioLogueado') && loginCorrecto(JSON.parse(localStorage.getItem('usuarioLogueado')))