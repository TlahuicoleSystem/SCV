import { getConnetion } from '../database/database'
import { queries } from '../database/queries'

export const getAllProductsService = async() => {
    let productsList = null
    try {
        const conn = await getConnetion()
        productsList = await conn.query(queries.finAll)
    } catch (e) {
        throw e.message
    }
    return productsList
}


//insert products

export const insertProduct = async(product) => {
    let idNewProduct = null
    try {
        const conn = await getConnetion()
        const result = await conn.query(queries.insert, product)
        idNewProduct = result.insertId
    } catch (e) {
        throw e.message
    }
    return idNewProduct
}

//uodate products

export const updateProduct = async(product, id) => {
    try {
        const conn = await getConnetion()
        await conn.query(queries.update, [product, id])
    } catch (e) {
        throw e.message
    }
}

//delate products

export const deleteProduct = async id => {
    try {
        const conn = await getConnetion()
        await conn.query(queries.delete, id)
    } catch (e) {
        throw e.message
    }
}