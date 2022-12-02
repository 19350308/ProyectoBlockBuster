const modeloPeliculas = {
    queryGetPeliculas: "SELECT * FROM Peliculas",
    querygetPeliculasByID: "SELECT * FROM Peliculas WHERE ID = ?",
    querydeleteTPeliculasByID: `UPDATE Peliculas SET Disponible = 'N' WHERE ID = ?`
}

    module.exports = {modeloPeliculas}