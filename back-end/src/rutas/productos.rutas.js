  import { Router } from 'express'
  import { consultarP, insertarP, eliminarP, actualizarP, insertarI, consultarU, insertarC, consultarC, consultarCS, insertarD, insertarPe, insertarPa, 
  reporteVen, reporteCom, reporteAbi, insertarProdCarri, consultarCarri, eliminarCarri, eliminarProdCarri, consultarFav, buscarPro, insertarComent,
  consultarComen } from '../controllers/productos.controller'

  const upload = require('../libs/storage')

  const router = Router()

  router.get("/consultar", consultarP) //consulta por categorias o todas
  router.get("/consulta", consultarU) // consulta por unidad
  router.post("/insertar", insertarP) //insertar producto
  router.get("/eliminar", eliminarP) //eliminar producto
  router.post("/actualizar", actualizarP) //actualizar productos 

  router.post("/insertarC", insertarC) //insertar clientes
  router.post("/consultarC", consultarC) //consultar cliente para el login
  router.get("/consultarCS", consultarCS) //consultar lista de los clientes

  router.post("/insertarD", insertarD) //insertar la direccion de envio
  router.post("/insertarPa", insertarPa) //insertar forma de pago
  router.post("/insertarPe", insertarPe) //insertar pedido

  router.get("/reportesVen", reporteVen) //reportes de ventas para administrador
  router.get("/reporteCom", reporteCom) //reporte de todas las compras del cliente
  router.get("/reporteAbi", reporteAbi) //reporte de los pedidos abiertos

  router.post("/insertarCarr", insertarProdCarri) //insertar productos al carrito
  router.get("/consultarCarri", consultarCarri) //consultar carrito
  router.get("/eliminarCarri", eliminarCarri) //elimina todo el carrito de un cliente
  router.get("/eliminarProdCarri", eliminarProdCarri) //eliminar un producto del carrito

  //Ingresa los comentarios de los clientes
  router.post("/insertComentario",insertarComent)
  router.get("/consultarComentario",consultarComen)

  router.get("/consultarFav", consultarFav) //consulta los favoritos
  router.get("/buscar", buscarPro)//Buscar Productos

  router.post("/insertarI", upload.single('image'), insertarI)//Insertar Imagen

  export default router