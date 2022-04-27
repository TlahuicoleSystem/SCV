import express from 'express'
import morgan from 'morgan'
import config from './config'
import cors from 'cors'

//Importo el archivo de las rutas
import productsRoutes from './rutas/productos.rutas'

//inicializacion de express
const app = express()

//cofiguracion de puerto -> 3000
app.set('port', config.port)

//midleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//Rutas del servidor
app.use("/scv", productsRoutes)

//Rura estatica para las imagenes
app.use("/public", express.static(__dirname + '/img'))

export default app