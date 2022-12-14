const {Router} = require("express")
const {getClientes,getClientesByID,deleteClientesByID, addClientes, updateClientesByUsuario} = require("../controllers/clientes")
const router = Router()

//http://localhost:4008/api/v1/clientes

/// GET ///
router.get("/", getClientes)
router.get("/id/:id", getClientesByID)

/// POST ///
router.post("/", addClientes)

/// PUT ///
router.put("/", updateClientesByUsuario)

/// DELETE ///
router.delete("/",deleteClientesByID)

module.exports = router