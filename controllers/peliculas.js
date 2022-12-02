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



module.exports = {getPeliculas,getPeliculasByID, deleteTPeliculasByID}