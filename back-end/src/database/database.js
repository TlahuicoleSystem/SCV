  import mysql from 'promise-mysql'
  import config from '../config'

  const dbSettings = {
          host: config.dbHost,
          user: config.dbUser,
          password: config.dbPassword,
          database: config.dbDatabase
      }
      //Recupera la conexion a la base de datos
  export const getConnetion = () => {
      let connetion = null
      try {
          connetion = mysql.createConnection(dbSettings)
      } catch (e) {
          console.error("Error en la conexion a la base de datos")
      }
      return connetion
  }