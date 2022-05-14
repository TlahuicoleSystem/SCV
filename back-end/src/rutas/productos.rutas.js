  import { Router } from 'express'
  import { consultarP, insertarP, eliminarP, actualizarP, insertarI, consultarU, insertarC, consultarC, consultarCS } from '../controllers/productos.controller'

  const upload = require('../libs/storage')

  const router = Router()

  router.get("/consultar", consultarP) //consulta por categorias o todas
  router.get("/consulta", consultarU) // consulta por unidad
  router.post("/insertar", insertarP)
  router.get("/eliminar", eliminarP)
  router.post("/actualizar", actualizarP)


  router.post("/insertarC", insertarC) //insertar clientes
  router.post("/consultarC", consultarC) //consultar cliente para el login
  router.get("/consultarCS", consultarCS) //consultar lista de los clientes

  router.post("/insertarI", upload.single('image'), insertarI)

  export default router