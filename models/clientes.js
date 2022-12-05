const modeloClientes = {
    queryGetClientes: "SELECT * FROM Clientes",
    querygetClientesByID: "SELECT * FROM Clientes WHERE ID = ?",
    querydeleteClientesByID: `DELETE FROM Clientes WHERE ID = ?`,
    queryClientesExists: `SELECT Correo FROM Clientes WHERE Correo = ?`,
    queryaddClientes: `
    INSERT INTO Clientes (
        Correo,
        Nombre,
        Apellidos,
        Edad,
        Genero,
        Contrasena,
        Fecha_Nacimiento,
        Activo
    ) VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?)`
}

    module.exports = {modeloClientes}