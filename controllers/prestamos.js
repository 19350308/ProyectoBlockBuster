const { request, response } = require("express");
const pool = require("../db/connection");
const {modeloPrestamos} = require("../models/prestamos");

const getPrestamos = async (req = request, res = response) =>{
    
    let conn;
    
    try {
        conn = await pool.getConnection()
        
        const prestamos = await conn.query(modeloPrestamos.queryGetPrestamos, (error) => {throw new Error(error) })
        
        if (!prestamos) {
            res.status(404).json({msg:"no se encontraron registros del Prestamo"})
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

const getPrestamosByID = async (req = request, res = response) =>{
    
    const {id} = req.params
    let conn;
    
    try {
        conn = await pool.getConnection()
        
        const [prestamos] = await conn.query(modeloPrestamos.querygetPrestamosByID, [id], (error) => {throw new Error(error) })
        
        if (!prestamos) {
            res.status(404).json({msg: `No se encontró registro del Prestamo con el ID ${id}`})
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

module.exports = {getPrestamos,getPrestamosByID}