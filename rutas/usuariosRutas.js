var ruta = require("express").Router();
var fs = require("fs");
var path = require("path");
var subirArchivo = require("../middlewares/middlewares").subirArchivo;
var {mostrarUsuarios, nuevoUsuario, buscarPorId, modificarUsuario, borrarUsuario} = require("../bd/usuariosBD");

ruta.get("/", async (req, res) => {
    var users = await mostrarUsuarios();
    res.render("usuarios/mostrar", {users});
})
ruta.get("/nuevousuario",(req,res)=>{
    res.render("usuarios/nuevo");
}); 

ruta.post("/nuevousuario", subirArchivo(), async (req,res)=>{
    req.body.foto = req.file.originalname;
    var error= await nuevoUsuario(req.body);
    res.redirect("/"); 
}); 

ruta.get("/editarUsuario/:id", async (req, res) => {
    var user = await buscarPorId(req.params.id);
    res.render("usuarios/modificar", { user });
});

ruta.post("/editarUsuario", subirArchivo(), async (req,res)=>{
    try {
            var rutaImagen = path.join(__dirname, "..", "web", "images", req.body.foto);
            if (fs.existsSync(rutaImagen)) {
                fs.unlinkSync(rutaImagen);
                req.body.foto = req.file.originalname;
                await modificarUsuario(req.body);
            }
        
        res.redirect("/");
    } catch (error) {
        console.error("Error al editar usuario:", error);
    }
});

ruta.get("/borrarUsuario/:id", async (req, res) => {
    try {
        var usuario = await buscarPorId(req.params.id);
        if (usuario) {
            var rutaImagen = path.join(__dirname, "..", "web", "images", usuario.foto);
            if (fs.existsSync(rutaImagen)) {
                fs.unlinkSync(rutaImagen);
            }
            await borrarUsuario(req.params.id);
        }
        res.redirect("/");
    } catch (error) {
        console.error("Error al borrar usuario:", error);
    }
});


module.exports = ruta;