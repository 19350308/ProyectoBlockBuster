const {Router} = require("express")
const {getPeliculas, getPeliculasByID} = require("../controllers/peliculas")
const router = Router()

//http://localhost:4008/api/v1/peliculas

/// GET ///
router.get("/", getPeliculas)
router.get("/id/:id", getPeliculasByID)

module.exports = router