const {Router} = require("express")
const {getClientes} = require("../controllers/clientes")
const router = Router()

//http://localhost:4008/api/v1/clientes

/// GET ///
router.get("/", getClientes)

module.exports = router