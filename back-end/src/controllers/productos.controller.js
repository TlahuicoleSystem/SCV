  import { consultarProductos, insertarProductos, actualizarProducto, eliminarProducto, insertarImagen } from '../servicios/productos.servicio'

  export const consultarP = async(req, res) => {
      let respuesta = null
      let status = null
      try {
          const productsList = await consultarProductos()
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

  export const insertarI = async(req, res) => {
      let respuesta = null
      let status = null
      try {
          const product = req.body

          const id = await insertarImagen(product)
          respuesta = {
              success: true,
              data: id,
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