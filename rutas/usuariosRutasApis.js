var ruta = require("express").Router();
var {mostrarUsuarios, nuevoUsuario, buscarPorId, modificarUsuario, borrarUsuario} = require("../bd/usuariosBD");

ruta.get("/api/", async (req, res) => {
    var users = await mostrarUsuarios();
    if(users.length > 0){
        res.status(200).json(users);
    }
    else{
        res.status(400).json("Usuarios no encontrados");
    }
})

ruta.post("/api/nuevousuario",async (req,res)=>{
    var error= await nuevoUsuario(req.body);
    if(error == 0){
        res.status(200).json("Usuario registrado correctamente");
    }
    else{
        res.status(400).json("El usuario no se registro correctamente");
    } 
}); 

ruta.get("/api/buscarUsuarioPorId/:id", async(req, res) => {
    var user = await buscarPorId(req.params.id);
    if(user!=undefined){
        res.status(200).json(user);
    }
    else{
        res.status(400).json("Usuario no encontrado")
    }
});

ruta.post("/api/editarUsuario", async(req, res) => {
    var error = await modificarUsuario(req.body);
    if(error == 0){
        res.status(200).json("Actualización ejecutada correctamente");
    }
    else{
        res.status(400).json("Actalización no ejecutada");
    }
})

ruta.get("/api/borrarUsuario/:id", async(req, res) => {
    var error = await borrarUsuario(req.params.id);
    if(error == 0){
        res.status(200).json("El usuario fue borrado correctamente");
    }
    else{
        res.status(400).json("Error al borrar el usuario");
    }
})

module.exports = ruta;