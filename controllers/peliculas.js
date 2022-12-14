const { request, response } = require("express");
const pool = require("../db/connection");
const {modeloPeliculas} = require("../models/peliculas");

const getPeliculas = async (req = request, res = response) =>{
    
    let conn;
    
    try {
        conn = await pool.getConnection()
        
        const peliculas = await conn.query(modeloPeliculas.queryGetPeliculas, (error) => {throw new Error(error) })
        
        if (!peliculas) {
            res.status(404).json({msg:"no se encontraron registros de la pelicula"})
            return
        }
        res.json({peliculas})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

const getPeliculasByID = async (req = request, res = response) =>{
    
    const {id} = req.params
    let conn;
    
    try {
        conn = await pool.getConnection()
        
        const [peliculas] = await conn.query(modeloPeliculas.querygetPeliculasByID, [id], (error) => {throw new Error(error) })
        
        if (!peliculas) {
            res.status(404).json({msg: `No se encontró registro de la pelicula con el ID ${id}`})
            return
        }
        res.json({peliculas})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

const deleteTPeliculasByID = async (req = request, res = response) =>{
    
    const {id} = req.query
    let conn;
    
    try {
        conn = await pool.getConnection()
       
        const {affectedRows} = await conn.query(modeloPeliculas.querydeleteTPeliculasByID, [id], (error) => {throw new Error(error) })
       
        if (!affectedRows === 0) {
            res.status(404).json({msg: `No se pudo dar de baja la Pelicula con el ID ${id}`})
            return
        }
 
        res.json({msg: `La pelicula con ID ${id} se dio de baja sastifactoriamente. `})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

const addPeliculas = async (req = request, res = response) =>{
    
    const {
        Nombre,
        Genero,
        Fecha_E,
        Autor,
        Disponible,
        Idioma
    } = req.body

    if (
        !Nombre ||
        !Genero ||
        !Fecha_E ||
        !Disponible ||
        !Autor ||
        !Idioma
    ){
        res.status(400).json({msg: "Falta información de la Pelicula"})
        return
    }

    let conn;
    
    try {
        conn = await pool.getConnection()
        

        const [user] = await conn.query(modeloPeliculas.queryPeliculasExists, [Nombre])

        if (user) {
            res.status(403).json({msg: `La Pelicula ${Nombre} ya se encuentra registrado.`})
            return
        }

        const {affectedRows} = await conn.query(modeloPeliculas.queryaddPeliculas, 
        [Nombre,
        Genero,
        Fecha_E,
        Autor,
        Disponible,
        Idioma
    ], (error) => {throw new Error(error) })
        
        if (!affectedRows === 0) {
            res.status(404).json({msg: `No se pudo agregar la Pelicula ${Nombre}`})
            return
        }
 
        res.json({msg: `La Pelicula ${Nombre} se agrego sastifactoriamente. `})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

const updatePeliculasByNombre = async (req = request, res = response) =>{
    
    const {
        Nombre,
        Genero,
        Fecha_E,
        Autor,
        Disponible,
        Idioma
    } = req.body

    if (
        !Nombre ||
        !Genero ||
        !Fecha_E ||
        !Autor ||
        !Disponible ||
        !Idioma 
    ) {
        res.status(400).json({msg: "Falta información de la pelicula"})
        return
    }

    let conn;
    
    try {
        conn = await pool.getConnection()
        

        const [user] = await conn.query(modeloPeliculas.queryGetPeliculasInfo, [Nombre])
        
        if (!user) {
            res.status(403).json({msg: `La Pelicula ${Nombre} no se encuentra registrado.`})
            return
        }
         
        const {affectedRows} = await conn.query(modeloPeliculas.queryUpdateByPeliculas,
            [
            Genero || user.Genero,
            Fecha_E || user.Fecha_E,
            Autor  || user.Autor,
            Disponible  || user.Disponible,
            Idioma || user.Idioma,
            Nombre
            ], (error) => {throw new Error(error) })
        
        if (!affectedRows === 0) {
            res.status(404).json({msg: `No se pudo agregar el registro de la pelicula ${Nombre}`})
            return
        }
 
        res.json({msg: `La Pelicula ${Nombre} se actualizó sastifactoriamente. `})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

module.exports = {getPeliculas,getPeliculasByID, deleteTPeliculasByID, addPeliculas,updatePeliculasByNombre}