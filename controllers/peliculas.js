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

module.exports = {getPeliculas}