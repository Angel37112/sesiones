var admin = require("firebase-admin");
var keys = require("../keys.json");

admin.initializeApp({
    credential:admin.credential.cert(keys)
});

var cuenta = admin.firestore();
var conexionUsuarios = cuenta.collection("usuarios");
var conexionProductos = cuenta.collection("productos");

module.exports = {
    conexionUsuarios,
    conexionProductos
}