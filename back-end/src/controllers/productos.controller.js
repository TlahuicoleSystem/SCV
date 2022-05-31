import { consultarProductos, insertarProductos, actualizarProducto, eliminarProducto, consultarUnidad, insertarClientes, consultarCliente, consultarClientes, insertarDireccion, insertarPedido, insertarPago, consultarPe } from '../servicios/productos.servicio'

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


//consultar pedido
export const consultarPed = async(req, res) => {
    let respuesta = null
    let status = null
    try {
        const listClients = await consultarPe()
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