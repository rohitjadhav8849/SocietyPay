const express = require("express");
const router =express.Router();
const {register,login,Sendname}= require("../controllers/authcontroller");

router.post("/register",register);
router.post("/login",login);
router.get("/societyname/:id",Sendname);

module.exports=router;
