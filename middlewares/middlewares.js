var multer = require("multer");

function subirArchivo(){
    var storage = multer.diskStorage({
        destination:'./web/images',
        filename: (req, file, cb) => {
            var archivo = Date.now() + file.originalname;
            cb(null, archivo);
        }
    })

    return multer({storage}).single('foto')
}

module.exports = {
    subirArchivo
}