  import { Router } from 'express'
  import { consultarP, insertarP, eliminarP, actualizarP, insertarI } from '../controllers/productos.controller'

  const upload = require('../libs/storage')

  const router = Router()

  router.get("/consultar", consultarP)
  router.post("/insertar", insertarP)
  router.get("/eliminar", eliminarP)
  router.post("/actualizar", actualizarP)
  router.post("/insertarI", upload.single('image'), insertarI)

  export default router