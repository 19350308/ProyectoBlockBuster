const { request, response } = require("express");
const pool = require("../db/connection");
const {modeloPrestamos} = require("../models/prestamos");

const getPrestamos = async (req = request, res = response) =>{
    
    let conn;
    
    try {
        conn = await pool.getConnection()
        
        const prestamos = await conn.query(modeloPrestamos.queryGetPrestamos, (error) => {throw new Error(error) })
        
        if (!prestamos) {
            res.status(404).json({msg:"no se encontraron registros del Cliente"})
            return
        }
        res.json({prestamos})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

module.exports = {getPrestamos}