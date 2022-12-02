const {Router} = require("express")
const {getPeliculas, getPeliculasByID,deleteTPeliculasByID} = require("../controllers/peliculas")
const router = Router()

//http://localhost:4008/api/v1/peliculas

/// GET ///
router.get("/", getPeliculas)
router.get("/id/:id", getPeliculasByID)

/// DELETE ///
router.delete("/",deleteTPeliculasByID)

module.exports = router