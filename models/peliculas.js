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
        ?)`,
    queryGetPeliculasInfo:
    `SELECT Nombre, Genero, Fecha_E, Autor, Disponible, Idioma
            FROM Peliculas 
            WHERE Nombre = ?`,
    queryUpdateByPeliculas:
    `UPDATE Peliculas SET  
                Genero = ?,
                Fecha_E = ?,
                Autor = ?,
                Disponible = ?,
                Idioma = ?
                WHERE Nombre = ?`
}
    module.exports = {modeloPeliculas}