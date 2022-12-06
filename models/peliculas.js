const modeloPeliculas = {
    queryGetPeliculas: "SELECT * FROM Peliculas",
    querygetPeliculasByID: "SELECT * FROM Peliculas WHERE ID = ?",
    querydeleteTPeliculasByID: `UPDATE Peliculas SET Disponible = 'N' WHERE ID = ?`,
    queryPeliculasExists: `SELECT Nombre FROM Peliculas WHERE Nombre = ?`,
    queryaddPeliculas: `
    INSERT INTO Peliculas (
        Nombre,
        Genero,
        Fecha_E,
        Autor,
        Disponible,
        Idioma
    ) VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?)`
}
    module.exports = {modeloPeliculas}