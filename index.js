require("dotenv").config();
var express = require("express");
var path = require("path");
var cors = require("cors");
var port = process.env.PORT || 3000;
var rutasUsuarios = require("./rutas/usuariosRutas");
var rutasProductos = require("./rutas/productosRutas");
var rutasUsuariosApis = require("./rutas/usuariosRutasApis");
var rutasProductosApis = require("./rutas/productosRutasApis");

var app = express();
app.set("view engine", "ejs");
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use("/", express.static(path.join(__dirname, "/web")));
app.use("/", rutasUsuarios);
app.use("/", rutasProductos);
app.use("/", rutasUsuariosApis);
app.use("/", rutasProductosApis);
app.use(express.json());

app.listen(port, () => {
    console.log("Servidor en https.//localhost:" + port);
})