const {Router} = require("express")
const {getPeliculas} = require("../controllers/peliculas")
const router = Router()

//http://localhost:4008/api/v1/peliculas

/// GET ///
router.get("/", getPeliculas)

module.exports = router