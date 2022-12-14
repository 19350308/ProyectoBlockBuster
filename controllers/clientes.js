const { request, response } = require("express");
const pool = require("../db/connection");
const bcryptjs = require("bcryptjs")
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

const getClientesByID = async (req = request, res = response) =>{
    
    const {id} = req.params
    let conn;
    
    try {
        conn = await pool.getConnection()
        
        const [clientes] = await conn.query(modeloClientes.querygetClientesByID, [id], (error) => {throw new Error(error) })
        
        if (!clientes) {
            res.status(404).json({msg: `No se encontrĂ³ registro del cliente con el ID ${id}`})
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

const deleteClientesByID = async (req = request, res = response) =>{
    
    const {id} = req.query
    let conn;
    
    try {
        conn = await pool.getConnection()
       
        const {affectedRows} = await conn.query(modeloClientes.querydeleteClientesByID, [id], (error) => {throw new Error(error) })
       
        if (!affectedRows === 0) {
            res.status(404).json({msg: `No se pudo eliminar el cliente con el ID ${id}`})
            return
        }
 
        res.json({msg: `El cliente con ID ${id} se elimino sastifactoriamente. `})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

const addClientes = async (req = request, res = response) =>{
    
    const {
        Correo,
        Nombre,
        Apellidos,
        Edad,
        Genero,
        Contrasena,
        Fecha_Nacimiento,
        Activo
    } = req.body

    if (
        !Correo ||
        !Nombre ||
        !Apellidos ||
        !Edad ||
        !Genero ||
        !Activo
    ){
        res.status(400).json({msg: "Falta informaciĂ³n del Cliente"})
        return
    }

    let conn;
    
    try {
        conn = await pool.getConnection()
        

        const [user] = await conn.query(modeloClientes.queryClientesExists, [Correo])

        if (user) {
            res.status(403).json({msg: `El Cliente ${Correo} ya se encuentra registrado.`})
            return
        }

        const salt = bcryptjs.genSaltSync()
        const ContrasenaCifrada = bcryptjs.hashSync(Contrasena,salt)
        const {affectedRows} = await conn.query(modeloClientes.queryaddClientes, 
        [Correo,
        Nombre,
        Apellidos,
        Edad,
        Genero,
        ContrasenaCifrada,
        Fecha_Nacimiento,
        Activo
    ], (error) => {throw new Error(error) })
        
        if (!affectedRows === 0) {
            res.status(404).json({msg: `No se pudo agregar el registro del Cliente ${Correo}`})
            return
        }
 
        res.json({msg: `El Cliente ${Correo} se agrego sastifactoriamente. `})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

const updateClientesByUsuario = async (req = request, res = response) =>{
    
    const {
        Correo,
        Nombre,
        Apellidos,
        Edad,
        Genero,
        Contrasena,
        Fecha_Nacimiento
    } = req.body

    if (
        !Correo ||
        !Nombre ||
        !Apellidos ||
        !Edad ||
        !Genero ||
        !Contrasena ||
        !Fecha_Nacimiento 
    ) {
        res.status(400).json({msg: "Falta informaciĂ³n del Cliente"})
        return
    }

    let conn;
    
    try {
        conn = await pool.getConnection()
        

        const [user] = await conn.query(modeloClientes.queryGetClientesInfo, [Correo])
        
        if (!user) {
            res.status(403).json({msg: `El cliente ${Correo} no se encuentra registrado.`})
            return
        }
         
        const {affectedRows} = await conn.query(modeloClientes.queryUpdateByClientes,
            [
            Nombre || user.Nombre,
            Apellidos || user.Apellidos,
            Edad  || user.Edad,
            Genero  || user.Genero,
            Contrasena || user.Contrasena,
            Fecha_Nacimiento  || user.Fecha_Nacimiento,
            Correo
            ], (error) => {throw new Error(error) })
        
        if (!affectedRows === 0) {
            res.status(404).json({msg: `No se pudo agregar el registro del Cliente ${Correo}`})
            return
        }
 
        res.json({msg: `El cliente ${Correo} se actualizĂ³ sastifactoriamente. `})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

const signIn = async (req=request,res=response)=>{
    const {
        Correo,
        Contrasena
    }=req.body

    if(
        !Correo||
        !Contrasena
    ){
        res.status(400).json({msg:"Falta informaciĂ³n del cliente."})
        return
    }

    let conn;

    try{
        conn = await pool.getConnection()
        const [user]=await conn.query(modeloClientes.querySignIn,[Correo])

        if(!user || user.Activo == 'N'){
            let code = !user ? 1: 2;
            res.status(403).json({msg:`El usuario o la contraseĂ±a son incorrectos`,errorCode:code})
            return
        }

        const accesoValido = bcryptjs.compareSync(Contrasena,user.Contrasena)

        if(!accesoValido){
            res.status(403).json({msg:`El usuario o la contraseĂ±a son incorrectos`,errorCode:"3"})
            return
        }


        res.json({msg:`El cliente ${Correo} ha iniciado seciĂ³n satisfactoriamenente`})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

module.exports = {getClientes,getClientesByID,deleteClientesByID,addClientes,updateClientesByUsuario,signIn}