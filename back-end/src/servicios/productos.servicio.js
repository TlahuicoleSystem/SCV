import { getConnetion } from '../database/database'
import { queries } from '../database/queries'


//consultar producto dependiendo de la categoria
export const consultarProductos = async(categoria) => {
    let listaProductos = null
    if (categoria == "todas") {
        try {
            const conn = await getConnetion()
            listaProductos = await conn.query(queries.consultar)
        } catch (e) {
            throw e.message
        }
    } else {
        console.log(categoria)
        try {
            const conn = await getConnetion()
            listaProductos = await conn.query(queries.consultarpc, categoria)
        } catch (e) {
            throw e.message
        }
    }
    return listaProductos
}

export const consultarUnidad = async(codigo_barras) => {
    let listaProductos = null
    try {
        const conn = await getConnetion()
        listaProductos = await conn.query(queries.consultaru, codigo_barras)
    } catch (e) {
        throw e.message
    }
    return listaProductos
}


//insertar productos

export const insertarProductos = async(product) => {
    let idNewProduct = null
    try {
        const conn = await getConnetion()
        const result = await conn.query(queries.insertar, product)
        idNewProduct = result.insertId
    } catch (e) {
        throw e.message
    }
    return idNewProduct
}


//actualizar productos

export const actualizarProducto = async(product, codigo_barras) => {
    try {
        const conn = await getConnetion()
        await conn.query(queries.actualizar, [product, codigo_barras])
    } catch (e) {
        throw e.message
    }
}

//borrar productos

export const eliminarProducto = async codigo_barras => {
    try {
        const conn = await getConnetion()
        await conn.query(queries.eliminar, codigo_barras)
    } catch (e) {
        throw e.message
    }
}

//insertar clientes

export const insertarClientes = async(cliente) => {
    let idNewProduct = null
    try {
        const conn = await getConnetion()
        const result = await conn.query(queries.agregaru, cliente)
        idNewProduct = result.insertId
    } catch (e) {
        throw e.message
    }
    return idNewProduct
}

//consultar cliente
export const consultarCliente = async(correo, contraseña) => {
    let id = null
    try {
        const conn = await getConnetion()
        id = await conn.query(queries.consultarc, [correo, contraseña])

    } catch (e) {
        throw e.message
    }
    return id
}