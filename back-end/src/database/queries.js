export const queries = {
    consultar: 'SELECT * FROM productos',
    consultarpc: 'SELECT * FROM productos WHERE categoria = ?',
    consultaru: 'SELECT * FROM productos WHERE codigo_barras = ?',
    insertar: 'INSERT INTO productos set ?',
    actualizar: 'UPDATE productos set ? WHERE codigo_barras = ?',
    eliminar: 'DELETE FROM productos WHERE codigo_barras = ?',

    agregaru: 'INSERT INTO clientes set ?',
    consultarc: 'SELECT idCliente, nombre FROM clientes WHERE correo = ? and contraseña = ?',
    consultarcs: 'SELECT * FROM clientes',

    mPago: 'INSERT INTO formapago set ?',
    denvio: 'INSERT INTO direccionenvio set ?',
    insertPedido: 'INSERT INTO pedidos SET ?',
    reporteVentas: 'SELECT pedidos.idPedido, productos.nombre, pedidos.idCliente, pedidos.total, pedidos.fechap FROM pedidos INNER JOIN productos ON pedidos.codigoBarras = productos.codigo_barras WHERE pedidos.fechap BETWEEN ? AND ?'

}