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
    reporteOrden: 'SELECT pedidos.numOrden,productos.nombre, pedidos.total, direccionenvio.calle, direccionenvio.numExt, direccionenvio.barrio, direccionenvio.municipio, direccionenvio.estado, formapago.numTarjeta, pedidos.status FROM productos INNER JOIN pedidos ON productos.codigo_barras = pedidos.codigoBarras INNER JOIN formapago ON pedidos.numOrden = formapago.numOrden INNER JOIN direccionenvio ON pedidos.numOrden = direccionenvio.numOrden WHERE pedidos.idCliente = ?',


    insertarProdCarri: 'INSERT INTO carrito set ?',
    consultarCarrito: 'SELECT carrito.codigoBarras, carrito.idCarrito, productos.foto, productos.nombre, carrito.precio, carrito.cantidad, carrito.importe FROM carrito INNER JOIN productos ON carrito.codigoBarras = productos.codigo_barras WHERE carrito.idCliente = ?',
    eliminarCarrito: 'DELETE FROM carrito WHERE idCliente = ?',
    eliminarProdCarri: 'DELETE FROM carrito WHERE idCliente = ? AND codigoBarras = ?',

    favoritos: 'SELECT pedidos.codigoBarras, productos.foto, productos.nombre, productos.descripcion_breve, COUNT( pedidos.codigoBarras ) AS total FROM pedidos INNER JOIN productos ON pedidos.codigoBarras = productos.codigo_barras GROUP BY pedidos.codigoBarras ORDER BY total DESC',
    buscar: 'SELECT codigo_barras, foto, nombre, descripcion_breve FROM productos WHERE nombre LIKE "%"?"%" '
}