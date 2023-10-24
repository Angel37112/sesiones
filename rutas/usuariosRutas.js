var ruta = require("express").Router();
var fs = require("fs");
var path = require("path");
var subirArchivo = require("../middlewares/middlewares").subirArchivo;
var {mostrarUsuarios, nuevoUsuario, buscarPorId, modificarUsuario, borrarUsuario, login} = require("../bd/usuariosBD");

ruta.get("/", async (req, res) => {
    res.render("usuarios/login");
})

ruta.post("/", async(req, res) => {
    var error = await login(req.body);
    if(error === 1){
        res.redirect("/")
    } 
    else if(error === 0){
        res.redirect("/mostrarUsuarios")
    }
})

ruta.get("/mostrarUsuarios", async(req, res) => {
    var users = await mostrarUsuarios();
    res.render("usuarios/mostrar", {users});
})

ruta.get("/nuevousuario",(req,res)=>{
    res.render("usuarios/nuevo");
}); 

ruta.post("/nuevousuario", subirArchivo(), async (req,res)=>{
    req.body.foto = req.file.filename;
    var error= await nuevoUsuario(req.body);
    res.redirect("/"); 
}); 

ruta.get("/editarUsuario/:id", async (req, res) => {
    var user = await buscarPorId(req.params.id);
    res.render("usuarios/modificar", { user });
});

ruta.post("/editarUsuario", subirArchivo(), async (req,res)=>{
    try {
        fs.unlinkSync("./web/images/"+req.body.fotoAnterior);
        req.body.foto = req.file.filename;
        await modificarUsuario(req.body);
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