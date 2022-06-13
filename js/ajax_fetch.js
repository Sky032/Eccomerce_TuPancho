const apiEndpoint = "https://swapi.dev/api/people/"

fetch(apiEndpoint)
  .then((resp) => resp.json())
  .then ((data) => {
    const personaje = data.results;
    productos.forEach((producto, index) => {
      producto.modelo = personaje[index].name
    })
    localStorage.setItem('productos', JSON.stringify(productos))
  })