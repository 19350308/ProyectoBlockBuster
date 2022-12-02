const modeloClientes = {
    queryGetClientes: "SELECT * FROM Clientes",
    querygetClientesByID: "SELECT * FROM Clientes WHERE ID = ?",
    querydeleteClientesByID: `DELETE FROM Clientes WHERE ID = ?`
}

    module.exports = {modeloClientes}