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
    reporteVentas: 'SELECT pedidos.idPedido, productos.nombre, pedidos.idCliente, pedidos.total, pedidos.fechap FROM pedidos INNER JOIN productos ON pedidos.codigoBarras = productos.codigo_barras WHERE pedidos.fechap BETWEEN ? AND ? ',
    reporteCompras: 'SELECT productos.foto, productos.nombre, productos.descripcion_breve, pedidos.precio, pedidos.codigoBarras FROM pedidos INNER JOIN productos ON pedidos.codigoBarras = productos.codigo_barras WHERE pedidos.idCliente = ?',
    reporteOrden: 'SELECT pedidos.numOrden,productos.nombre, pedidos.total, direccionenvio.calle, direccionenvio.numExt, direccionenvio.barrio, direccionenvio.municipio, direccionenvio.estado, formapago.numTarjeta, pedidos.status FROM productos INNER JOIN pedidos ON productos.codigo_barras = pedidos.codigoBarras INNER JOIN formapago ON pedidos.numOrden = formapago.numOrden INNER JOIN direccionenvio ON pedidos.numOrden = direccionenvio.numOrden WHERE pedidos.idCliente = ?'
}