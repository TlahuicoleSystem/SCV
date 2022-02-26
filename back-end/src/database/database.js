import mysql from 'promise-mysql'
import config from '../config'

const dbSettings = {
    host: config.dbHost,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbDatabase
}

export const getConnection = () => {
    let connection = null
    try {
        connection = mysql.createConnection(dbSettings)
    } catch (e) {
        console.error("database connection error")
    }
    return connection
}