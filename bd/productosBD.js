var conexion = require("./conexion").conexionProductos;
var Producto = require("../modelos/Producto");

async function mostrarProductos(){
    var prod = [];
    try {
        var productos = await conexion.get();
        productos.forEach(producto => {
        var producto1 = new Producto(producto.id, producto.data());
        if(producto1.bandera == 0){
            prod.push(producto1.obtenerProducto);
        }
    })
    }
    catch(err) {
        console.log("Error al mostrar productos " + err);
        prod = [];
    }
    return prod;
}

async function nuevoProducto(newProd){
    var error = 1; 
    try{
      var producto1 = new Producto(null,newProd);
      if(producto1.bandera == 0){
        conexion.doc().set(producto1.obtenerProducto);
        error = 0;
      }
      else{
        console.log("Datos incorrectos del formulario");
      }
    }
    catch(err){
      console.log("Error al crear un nuevo producto "+err);
    }
    return error; 
  }
  
  async function buscarPorIdProd(id){
    var prod;
    try{
      var productoDB = await conexion.doc(id).get();
      var productoObjeto = new Producto(productoDB.id, productoDB.data())
      if(productoObjeto.bandera == 0){
        prod = productoObjeto.obtenerProducto;
      }
    }
    catch(err){
      console.log("Error al recuperar al producto" + err);
    }
    return prod;
  }
  
  async function modificarProducto(datos){
    var prod = new Producto(datos.id, datos);
    var error = 1;
    if(prod.bandera == 0){
      try{
        await conexion.doc(prod.id).set(prod.obtenerProducto);
        console.log("Los datos se modificaron con exito");
        error = 0;
      }
      catch(err){
        console.log("Error al modificar al producto" + err);
      }
    }
    else{
      console.log("Error, los datos no son validos");
    }
    return error;
  }
  
  async function borrarProducto(id){
    var error = 1;
    var prod = buscarPorIdProd(id);
    if(prod != undefined){
      try{
        await conexion.doc(id).delete();
        console.log("Registro borrado");
        error = 0;
      }
      catch(err){
        console.log("Error al borrar al producto " + err);
      }
    }
    return error;
    }
  
  module.exports = {
      mostrarProductos,
      nuevoProducto,
      buscarPorIdProd,
      modificarProducto,
      borrarProducto
  }