import express from 'express'
import config from './config'


//Importo el archivo de las rutas
import productsRoutes from './routes/products.routes'

const app = express()

app.set('port', config.port)

app.use("/products", productsRoutes)

export default app