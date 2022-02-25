const express = require('express')
const router = express.Router()

const middle = require("../middleware/main")

const {registeruser, loginuser, logout,createauction,
    allauctions, getauction, addbid} =  require("../controllers/main")

router.post("/registeruser", middle.validateData, registeruser)
router.post("/login",loginuser)
router.get("/logout", logout)
router.post('/createauction', middle.validateAuction, createauction)
router.get("/allauctions", allauctions)
router.get("/auction/:id", getauction)
router.post("/addbid", addbid)
// router.get("/createuser",  createuser)
// router.post("/createcar", createcar)
// router.post("/findcar", findcar)
// router.post("/findcarench", findcar2)
// router.post("/updatecar/:id", updatecar)
// router.get("/deletecar/:id",deletecar)

module.exports = router