const {Router} = require("express")
const {getPrestamos} = require("../controllers/prestamos")
const router = Router()

//http://localhost:4008/api/v1/prestamos

/// GET ///
router.get("/", getPrestamos)

module.exports = router