const {Router} = require("express")
const {getPeliculas, getPeliculasByID,deleteTPeliculasByID, addPeliculas, updatePeliculasByNombre} = require("../controllers/peliculas")
const router = Router()

//http://localhost:4008/api/v1/peliculas

/// GET ///
router.get("/", getPeliculas)
router.get("/id/:id", getPeliculasByID)

/// POST ///
router.post("/", addPeliculas)

/// PUT ///
router.put("/", updatePeliculasByNombre)

/// DELETE ///
router.delete("/",deleteTPeliculasByID)

module.exports = router