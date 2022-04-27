import { getConnetion } from '../database/database'
import { queries } from '../database/queries'

export const consultarProductos = async() => {
    let listaProductos = null
    try {
        const conn = await getConnetion()
        listaProductos = await conn.query(queries.consultar)
    } catch (e) {
        throw e.message
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


//insert products

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


//uodate products

export const actualizarProducto = async(product, codigo_barras) => {
    try {
        const conn = await getConnetion()
        await conn.query(queries.actualizar, [product, codigo_barras])
    } catch (e) {
        throw e.message
    }
}

//delate products

export const eliminarProducto = async codigo_barras => {
    try {
        const conn = await getConnetion()
        await conn.query(queries.eliminar, codigo_barras)
    } catch (e) {
        throw e.message
    }
}