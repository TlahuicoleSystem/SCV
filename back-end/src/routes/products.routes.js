import { Router } from 'express'
import { findAllProducts } from '../controllers/products.controller'

const router = Router()

router.get("/findAllProducts", findAllProducts)


export default router