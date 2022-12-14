const {Router} = require("express")
const {getPrestamos,getPrestamosByID,deletePrestamosByID, addPrestamos,updatePrestamosByUsuario} = require("../controllers/prestamos")
const router = Router()

//http://localhost:4008/api/v1/prestamos

/// GET ///
router.get("/", getPrestamos)
router.get("/id/:id", getPrestamosByID)

/// POST ///
router.post("/", addPrestamos)

/// PUT ///
router.put("/", updatePrestamosByUsuario)

/// DELETE ///
router.delete("/",deletePrestamosByID)

module.exports = router