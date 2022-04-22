export const queries = {
    consultar: 'SELECT * FROM productos',
    insertar: 'INSERT INTO productos set ?',
    /*insertar: 'INSERT INTO productos (codigo_barras, nombre, foto, descripcion_breve, descripcion, precio, existencias, categoria) VALUES(?, ?, ?, ?, ?, ?, ?, ?)',*/
    actualizar: 'UPDATE productos SET ? where codigo_barras = ?',
    eliminar: 'DELETE FROM productos WHERE codigo_barras = ?',
}