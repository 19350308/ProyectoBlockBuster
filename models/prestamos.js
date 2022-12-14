const modeloPrestamos = {
    queryGetPrestamos: "SELECT * FROM Prestamos",
    querygetPrestamosByID: "SELECT * FROM Prestamos WHERE ID = ?"
}

module.exports = {modeloPrestamos}