export const queries = {
    consultar: 'SELECT * FROM productos',
    consultarpc: 'SELECT * FROM productos WHERE categoria = ?',
    consultaru: 'SELECT * FROM productos WHERE codigo_barras = ?',
    insertar: 'INSERT INTO productos set ?',
    actualizar: 'UPDATE productos set ? WHERE codigo_barras = ?',
    eliminar: 'DELETE FROM productos WHERE codigo_barras = ?',

    agregaru: 'INSERT INTO clientes set ?',
    consultarc: 'SELECT id FROM clientes WHERE correo = ? and contraseña = ?',
}