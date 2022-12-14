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

const deletePrestamosByID = async (req = request, res = response) =>{
    
    const {id} = req.query
    let conn;
    
    try {
        conn = await pool.getConnection()
       
        const {affectedRows} = await conn.query(modeloPrestamos.querydeletePrestamosByID, [id], (error) => {throw new Error(error) })
       
        if (!affectedRows === 0) {
            res.status(404).json({msg: `No se pudo eliminar el Prestamo con el ID ${id}`})
            return
        }
 
        res.json({msg: `El prestamo con ID ${id} se elimino sastifactoriamente. `})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

const addPrestamos = async (req = request, res = response) =>{
    
    const {
        CorreoP,
        NombreP,
        ApellidosP,
        Pelicula,
        Precio,
        Pagado,
        Dia_Entrega
    } = req.body

    if (
        !CorreoP ||
        !NombreP ||
        !ApellidosP ||
        !Pelicula ||
        !Precio ||
        !Pagado ||
        !Dia_Entrega
    ){
        res.status(400).json({msg: "Falta información del Prestamo"})
        return
    }

    let conn;
    
    try {
        conn = await pool.getConnection()
        

        const [user] = await conn.query(modeloPrestamos.queryPrestamosExists, [CorreoP])

        if (user) {
            res.status(403).json({msg: `El Prestamo ${CorreoP} ya se encuentra registrado.`})
            return
        }

        const {affectedRows} = await conn.query(modeloPrestamos.queryaddPrestamos, 
        [CorreoP,
        NombreP,
        ApellidosP,
        Pelicula,
        Precio,
        Pagado,
        Dia_Entrega
    ], (error) => {throw new Error(error) })
        
        if (!affectedRows === 0) {
            res.status(404).json({msg: `No se pudo agregar el registro del Prestamo ${CorreoP}`})
            return
        }
 
        res.json({msg: `El Prestamo ${CorreoP} se agrego sastifactoriamente. `})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

const updatePrestamosByUsuario = async (req = request, res = response) =>{
    
    const {
        CorreoP,
        NombreP,
        ApellidosP,
        Pelicula,
        Precio,
        Pagado,
        Dia_Entrega
    } = req.body

    if (
        !CorreoP ||
        !NombreP ||
        !ApellidosP ||
        !Pelicula ||
        !Precio ||
        !Pagado ||
        !Dia_Entrega 
    ) {
        res.status(400).json({msg: "Falta información del Prestamo"})
        return
    }

    let conn;
    
    try {
        conn = await pool.getConnection()
        

        const [user] = await conn.query(modeloPrestamos.queryGetPrestamosInfo, [CorreoP])
        
        if (!user) {
            res.status(403).json({msg: `El Prestamo ${CorreoP} no se encuentra registrado.`})
            return
        }
         
        const {affectedRows} = await conn.query(modeloPrestamos.queryUpdateByPrestamos,
            [
            NombreP || user.NombreP,
            ApellidosP || user.ApellidosP,
            Pelicula  || user.Pelicula,
            Precio  || user.Precio,
            Pagado || user.Pagado,
            Dia_Entrega  || user.Dia_Entrega,
            CorreoP
            ], (error) => {throw new Error(error) })
        
        if (!affectedRows === 0) {
            res.status(404).json({msg: `No se pudo agregar el registro del Prestamo ${CorreoP}`})
            return
        }
 
        res.json({msg: `El Prestamo ${CorreoP} se actualizó sastifactoriamente. `})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

module.exports = {getPrestamos,getPrestamosByID,deletePrestamosByID,addPrestamos,updatePrestamosByUsuario}