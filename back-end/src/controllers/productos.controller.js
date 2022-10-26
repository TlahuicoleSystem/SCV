import { consultarProductos, insertarProductos, actualizarProducto, eliminarProducto, consultarUnidad, insertarClientes, consultarCliente, 
    consultarClientes, insertarDireccion, insertarPedido, insertarPago, reporteVentas, reporteCompras, reporteAbierto, insertarProductoCarrito, 
    consultarCarrito, eliminarCarrito, eliminarProductoCarrito, consultarFavoritos, buscar, insertarComentario,
    consultarComentario, consultarClientePerfil } from '../servicios/productos.servicio'

//consultar producto dependiendo de la categoria o todas
export const consultarP = async(req, res) => {
    let respuesta = null
    let status = null
    try {
        const { categoria } = req.query
        const productsList = await consultarProductos(categoria)
        respuesta = {
            success: true,
            data: productsList,
            message: "Lista productos"
        }
        status = 200
    } catch (e) {
        respuesta = {
            success: false,
            data: null,
            message: "No se encontro lista productos"
        }
        status = 400
    }
    res.status(status)
    res.json(respuesta)
}

//consultar un unico producto
export const consultarU = async(req, res) => {
    let respuesta = null
    let status = null
    try {
        const { codigo_barras } = req.query
        const productsList = await consultarUnidad(codigo_barras)
        respuesta = {
            success: true,
            data: productsList,
            message: "Producto"
        }
        status = 200
    } catch (e) {
        respuesta = {
            success: false,
            data: null,
            message: "No se encontro el producto"
        }
        status = 400
    }
    res.status(status)
    res.json(respuesta)
}

export const insertarP = async(req, res) => {

    let respuesta = null
    let status = null
    try {
        const product = req.body

        const id = await insertarProductos(product)
        respuesta = {
            success: true,
            data: id,
            message: "producto insertado"
        }
        status = 200
    } catch (e) {
        respuesta = {
            success: true,
            data: null,
            message: "producto no insertado",
            exception: e
        }
        status = 400
    }

    res.status(status)
    res.json(respuesta)
}

//Construir la url de la imagen y regresarla
export const insertarI = async(req, res) => {
    let respuesta = null
    let status = null
    try {
        const { filename } = req.file
        const ruta = "http://localhost:5000/public/" + filename
        console.log(filename)
        respuesta = {
            success: true,
            data: ruta,
            message: "Imagen insertada"
        }
        status = 200
    } catch (e) {
        respuesta = {
            success: true,
            data: null,
            message: "Imagen no insertada",
            exception: e
        }
        status = 400
    }
    res.status(status)
    res.json(respuesta)
}


export const actualizarP = async(req, res) => {
    let respuesta = null
    let status = null
    try {
        const { codigo_barras } = req.query
        const product = req.body
        await actualizarProducto(product, codigo_barras)
        respuesta = {
            success: true,
            data: null,
            message: "producto actualizado"
        }
        status = 200
    } catch (e) {
        respuesta = {
            success: true,
            data: null,
            message: "producto no actualizado",
            exception: e
        }
        status = 400
    }

    res.status(status)
    res.json(respuesta)
}

export const eliminarP = async(req, res) => {
    let respuesta = null
    let status = null
    try {
        const { codigo_barras } = req.query
        await eliminarProducto(codigo_barras)
        respuesta = {
            success: true,
            data: null,
            message: "producto eliminado"
        }
        status = 200
    } catch (e) {
        respuesta = {
            success: true,
            data: null,
            message: "producto no eliminado ",
            exception: e
        }
        status = 400
    }

    res.status(status)
    res.json(respuesta)
}

export const insertarC = async(req, res) => {
    let respuesta = null
    let status = null
    try {
        const cliente = req.body

        const id = await insertarClientes(cliente)
        respuesta = {
            success: true,
            data: id,
            message: "Cliente agregado"
        }
        status = 200
    } catch (e) {
        respuesta = {
            success: true,
            data: null,
            message: "Cliente no agregado",
            exception: e
        }
        status = 400
    }

    res.status(status)
    res.json(respuesta)
}

export const consultarC = async(req, res) => {
    let respuesta = null
    let status = null
    try {
        const { correo } = req.body
        const { contraseña } = req.body
        const id = await consultarCliente(correo, contraseña)
        respuesta = {
            success: true,
            data: id,
            message: "Lista de clientes"
        }
        status = 200
    } catch (e) {
        respuesta = {
            success: false,
            data: null,
            message: "No se encontraron clientes"
        }
        status = 400
    }
    res.status(status)
    res.json(respuesta)
}

export const consultarCS = async(req, res) => {
    let respuesta = null
    let status = null
    try {
        const listClients = await consultarClientes()
        respuesta = {
            success: true,
            data: listClients,
            message: "Lista de clientes"
        }
        status = 200
    } catch (e) {
        respuesta = {
            success: false,
            data: null,
            message: "No se encontraron clientes"
        }
        status = 400
    }
    res.status(status)
    res.json(respuesta)
}

export const consultarCliPerfil = async(req, res) => {
    let respuesta = null
    let status = null
    try {
        const { id } = req.query
        const listClients = await consultarClientePerfil(id)
        respuesta = {
            success: true,
            data: listClients,
            message: "Datos cliente"
        }
        status = 200
    } catch (e) {
        respuesta = {
            success: false,
            data: null,
            message: "No se encontraron datos"
        }
        status = 400
    }
    res.status(status)
    res.json(respuesta)
}

//insertar direccion de envio
export const insertarD = async(req, res) => {

    let respuesta = null
    let status = null
    try {
        const direccion = req.body

        const id = await insertarDireccion(direccion)
        respuesta = {
            success: true,
            data: id,
            message: "Direccion insertada"
        }
        status = 200
    } catch (e) {
        respuesta = {
            success: true,
            data: null,
            message: "direccion no insertada",
            exception: e
        }
        status = 400
    }

    res.status(status)
    res.json(respuesta)
}

//insertar pago
export const insertarPa = async(req, res) => {

    let respuesta = null
    let status = null
    try {
        const pago = req.body
        console.log(pago)
        const id = await insertarPago(pago)
        respuesta = {
            success: true,
            data: id,
            message: "Pago agregado"
        }
        status = 200
    } catch (e) {
        respuesta = {
            success: true,
            data: null,
            message: "Pago no agregado",
            exception: e
        }
        status = 400
    }

    res.status(status)
    res.json(respuesta)
}

//insertar pedido
export const insertarPe = async(req, res) => {
    let respuesta = null
    let status = null
    try {
        const pedido = req.body
        const id = await insertarPedido(pedido)
        respuesta = {
            success: true,
            data: id,
            message: "Pedido guardado"
        }
        status = 200
    } catch (e) {
        respuesta = {
            success: true,
            data: null,
            message: "Pedido no guardado",
            exception: e
        }
        status = 400
    }

    res.status(status)
    res.json(respuesta)
}

//Reporte de ventas para el administrador
export const reporteVen = async(req, res) => {
    let respuesta = null
    let status = null
    try {
        const { inicio } = req.query
        const { fin } = req.query
        const listVentas = await reporteVentas(inicio, fin)
        respuesta = {
            success: true,
            data: listVentas,
            message: "Lista de ventas"
        }
        status = 200
    } catch (e) {
        respuesta = {
            success: false,
            data: null,
            message: "No se encontraron ventas"
        }
        status = 400
    }
    res.status(status)
    res.json(respuesta)
}

//Reporte de las compras de un cliente
export const reporteCom = async(req, res) => {
    let respuesta = null
    let status = null
    try {
        const { idCliente } = req.query
        const listVentas = await reporteCompras(idCliente)
        respuesta = {
            success: true,
            data: listVentas,
            message: "Lista de compras"
        }
        status = 200
    } catch (e) {
        respuesta = {
            success: false,
            data: null,
            message: "No se encontraron compras"
        }
        status = 400
    }
    res.status(status)
    res.json(respuesta)
}

//Reporte de los pedidos abiertos
export const reporteAbi = async(req, res) => {
    let respuesta = null
    let status = null
    try {
        const { idCliente } = req.query
        const listVentas = await reporteAbierto(idCliente)
        respuesta = {
            success: true,
            data: listVentas,
            message: "Lista de pedidos"
        }
        status = 200
    } catch (e) {
        respuesta = {
            success: false,
            data: null,
            message: "No se encontraron pedidos"
        }
        status = 400
    }
    res.status(status)
    res.json(respuesta)
}

export const insertarProdCarri = async(req, res) => {
    let respuesta = null
    let status = null
    try {
        const producto = req.body
        console.log(producto)
        const listVentas = await insertarProductoCarrito(producto)
        respuesta = {
            success: true,
            data: listVentas,
            message: "Producto agregado"
        }
        status = 200
    } catch (e) {
        respuesta = {
            success: false,
            data: null,
            message: "Producto no agregado"
        }
        console.log(e)
        status = 400
    }
    res.status(status)
    res.json(respuesta)
}

//Reporte de los pedidos abiertos
export const consultarCarri = async(req, res) => {
    let respuesta = null
    let status = null
    try {
        const { idCliente } = req.query
        const listVentas = await consultarCarrito(idCliente)
        respuesta = {
            success: true,
            data: listVentas,
            message: "Lista de pedidos"
        }
        status = 200
    } catch (e) {
        respuesta = {
            success: false,
            data: null,
            message: "No se encontraron pedidos"
        }
        status = 400
    }
    res.status(status)
    res.json(respuesta)
}

//eliminar carrito
export const eliminarCarri = async(req, res) => {
    let respuesta = null
    let status = null
    try {
        const { idCliente } = req.query
        await eliminarCarrito(idCliente)
        respuesta = {
            success: true,
            data: null,
            message: "carrito eliminado"
        }
        status = 200
    } catch (e) {
        respuesta = {
            success: true,
            data: null,
            message: "carrito no eliminado ",
            exception: e
        }
        status = 400
    }

    res.status(status)
    res.json(respuesta)
}


//eliminar un producto del carrito
export const eliminarProdCarri = async(req, res) => {
    let respuesta = null
    let status = null
    try {
        const { idCliente } = req.query
        const { codigoBarras } = req.query
        console.log(idCliente, codigoBarras)
        await eliminarProductoCarrito(idCliente, codigoBarras)
        respuesta = {
            success: true,
            data: null,
            message: "producto eliminado"
        }
        status = 200
    } catch (e) {
        respuesta = {
            success: true,
            data: null,
            message: "producto no eliminado ",
            exception: e
        }
        status = 400
    }

    res.status(status)
    res.json(respuesta)
}

export const consultarFav = async(req, res) => {
    let respuesta = null
    let status = null
    try {
        const { codigo_barras } = req.query
        const productsList = await consultarFavoritos()
        respuesta = {
            success: true,
            data: productsList,
            message: "Producto"
        }
        status = 200
    } catch (e) {
        respuesta = {
            success: false,
            data: null,
            message: "No se encontro el producto"
        }
        status = 400
    }
    res.status(status)
    res.json(respuesta)
}

export const buscarPro = async(req, res) => {
    let respuesta = null
    let status = null

    try {
        const { texto } = req.query
        const productsList = await buscar(texto)
        respuesta = {
            success: true,
            data: productsList,
            message: "Productos encontrados"
        }
        status = 200
    } catch (e) {
        respuesta = {
            success: false,
            data: null,
            message: "No se encontraron datos"
        }
        console.log(e)
        status = 400
    }
    res.status(status)
    res.json(respuesta)
}

export const insertarComent = async(req, res) => {
    let respuesta = null
    let status = null
    try {
        const comentario = req.body
        const idComentario = await insertarComentario(comentario)
        respuesta = {
            success: true,
            data: idComentario,
            message: "Comentario agregado"
        }
        status = 200
    } catch (e) {
        respuesta = {
            success: false,
            data: null,
            message: "Comentario no agregado"
        }
        console.log(e)
        status = 400
    }
    res.status(status)
    res.json(respuesta)
}

export const consultarComen = async(req, res) => {
    let respuesta = null
    let status = null
    try {
        const comentarios = await consultarComentario()
        respuesta = {
            success: true,
            data: comentarios,
            message: "Comentario"
        }
        status = 200
    } catch (e) {
        respuesta = {
            success: false,
            data: null,
            message: "No se encontraron comentarios"
        }
        status = 400
    }
    res.status(status)
    res.json(respuesta)
}
