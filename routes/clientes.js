const {Router} = require("express")
const {getClientes,getClientesByID} = require("../controllers/clientes")
const router = Router()

//http://localhost:4008/api/v1/clientes

/// GET ///
router.get("/", getClientes)
router.get("/id/:id", getClientesByID)

module.exports = router