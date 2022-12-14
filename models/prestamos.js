const modeloPrestamos = {
    queryGetPrestamos: "SELECT * FROM Prestamos",
    querygetPrestamosByID: "SELECT * FROM Prestamos WHERE ID = ?",
    querydeletePrestamosByID: `DELETE FROM Prestamos WHERE ID = ?`,
    queryPrestamosExists: `SELECT CorreoP FROM Prestamos WHERE CorreoP = ?`,
    queryaddPrestamos: `
    INSERT INTO Prestamos (
        CorreoP,
        NombreP,
        ApellidosP,
        Pelicula,
        Precio,
        Pagado,
        Dia_Entrega
    ) VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?)`,
    queryGetPrestamosInfo:
    `SELECT CorreoP, NombreP, ApellidosP, Pelicula,Precio,Pagado,Dia_Entrega
            FROM Prestamos 
            WHERE CorreoP = ?`,
    queryUpdateByPrestamos:
    `UPDATE Prestamos SET  
                NombreP = ?,
                ApellidosP = ?,
                Pelicula = ?,
                Precio = ?,
                Pagado = ?,
                Dia_Entrega = ?
                WHERE CorreoP = ?`
}

module.exports = {modeloPrestamos}