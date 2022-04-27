  import { Router } from 'express'
  import { consultarP, insertarP, eliminarP, actualizarP, insertarI, consultarU } from '../controllers/productos.controller'

  const upload = require('../libs/storage')

  const router = Router()

  router.get("/consultar", consultarP)
  router.post("/insertar", insertarP)
  router.get("/eliminar", eliminarP)
  router.post("/actualizar", actualizarP)
  router.get("/consulta", consultarU)

  router.post("/insertarI", upload.single('image'), insertarI)

  export default router