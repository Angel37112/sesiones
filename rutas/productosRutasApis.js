var ruta = require("express").Router();
var {mostrarProductos, nuevoProducto, buscarPorIdProd, modificarProducto, borrarProducto} = require("../bd/productosBD");

ruta.get("/api/productos/mostrarProductos", async (req, res) => {
    var prod = await mostrarProductos();
    if(prod.length > 0){
        res.status(200).json(prod);
    }
    else{
        res.status(400).json("Productos no encontrados");
    }
})

ruta.post("/api/nuevoproducto",async (req,res)=>{
    var error= await nuevoProducto(req.body);
    if(error == 0){
        res.status(200).json("Producto registrado correctamente");
    }
    else{
        res.status(400).json("El producto no se registro correctamente");
    } 
}); 

ruta.get("/api/buscarProductoPorId/:id", async(req, res) => {
    var prod = await buscarPorIdProd(req.params.id);
    if(prod!=undefined){
        res.status(200).json(prod);
    }
    else{
        res.status(400).json("Producto no encontrado")
    }
});

ruta.post("/api/editarProducto", async(req, res) => {
    var error = await modificarProducto(req.body);
    if(error == 0){
        res.status(200).json("Actualización ejecutada correctamente");
    }
    else{
        res.status(400).json("Actalización no ejecutada");
    }
})

ruta.get("/api/borrarProducto/:id", async(req, res) => {
    var error = await borrarProducto(req.params.id);
    if(error == 0){
        res.status(200).json("El producto fue borrado correctamente");
    }
    else{
        res.status(400).json("Error al borrar el producto");
    }
})

module.exports = ruta;