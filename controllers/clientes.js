const { request, response } = require("express");
const pool = require("../db/connection");
const {modeloClientes} = require("../models/clientes");

const getClientes = async (req = request, res = response) =>{
    
    let conn;
    
    try {
        conn = await pool.getConnection()
        
        const clientes = await conn.query(modeloClientes.queryGetClientes, (error) => {throw new Error(error) })
        
        if (!clientes) {
            res.status(404).json({msg:"no se encontraron registros del Cliente"})
            return
        }
        res.json({clientes})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

module.exports = {getClientes}