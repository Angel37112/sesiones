var ruta = require("express").Router();
var fs = require("fs");
var path = require("path");
var subirArchivo = require("../middlewares/middlewares").subirArchivo;
var {mostrarProductos, nuevoProducto, buscarPorIdProd, modificarProducto, borrarProducto} = require("../bd/productosBD");

ruta.get("/productos/mostrarProductos", async (req, res) => {
    var prod = await mostrarProductos();
    res.render("productos/mostrarProductos", {prod});
})

ruta.get("/productos/nuevoproducto",(req,res)=>{
    res.render("productos/nuevoProducto");
}); 

ruta.post("/nuevoproducto", subirArchivo(), async (req,res)=>{
    var error = await nuevoProducto(req.body);
    req.body.foto = req.file.originalname;
    res.redirect("/mostrarProductos"); 
}); 

ruta.get("/editarProducto/:id", async(req, res) => {
    var prod = await buscarPorIdProd(req.params.id);
    res.render("productos/modificarProductos", {prod});
});

ruta.post("/editarProducto",subirArchivo(), async (req,res)=>{
    try {
            var rutaImagen = path.join(__dirname, "..", "web", "images", req.body.foto);
            if (fs.existsSync(rutaImagen)) {
                fs.unlinkSync(rutaImagen);
                req.body.foto = req.file.originalname;
                await modificarProducto(req.body);
            }
        
        res.redirect("/productos/mostrarProductos");
    } catch (error) {
        console.error("Error al editar usuario:", error);
    }
});

ruta.get("/borrarProducto/:id", async (req, res) => {
    try {
        var producto = await buscarPorIdProd(req.params.id);
        if (producto) {
            var rutaImagen = path.join(__dirname, "..", "web", "images", producto.foto);
            if (fs.existsSync(rutaImagen)) {
                fs.unlinkSync(rutaImagen);
            }
            await borrarProducto(req.params.id);
        }
        res.redirect("/productos/mostrarProductos");
    } catch (error) {
        console.error("Error al borrar usuario:", error);
    }
});

module.exports = ruta;