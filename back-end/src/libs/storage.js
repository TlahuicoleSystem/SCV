const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './src/img')
    },
    filename: function(req, file, cb) {
        var hoy = new Date();
        var fecha = hoy.getDate() + '' + (hoy.getMonth() + 1) + '' + hoy.getFullYear();
        var hora = hoy.getHours() + '' + hoy.getMinutes() + '' + hoy.getSeconds();
        var fechaYHora = fecha + '-' + hora;
        const uniqueSuffix = fechaYHora + '.jpg'
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })

module.exports = upload