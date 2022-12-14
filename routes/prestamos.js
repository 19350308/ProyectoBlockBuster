const {Router} = require("express")
const {getPrestamos,getPrestamosByID} = require("../controllers/prestamos")
const router = Router()

//http://localhost:4008/api/v1/prestamos

/// GET ///
router.get("/", getPrestamos)
router.get("/id/:id", getPrestamosByID)

module.exports = router