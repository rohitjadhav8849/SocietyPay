const express=require("express");
const router=express.Router();
const {protect} =require("../middleware/authmiddleware");

const {
  predictPaymentRisk
} =require("./../AI-controller/aiController");
const {
  analyzecomplaint,  
  getComplaints,
  submitcomplaint
} =require("./../AI-controller/complaintAiController");

router.get("/ai/predict/:userid",protect,predictPaymentRisk);
router.post("/ai/analyze-complaint",protect,analyzecomplaint);
router.get("/ai/complaints",protect,getComplaints);
router.post("/ai/submitcomplaint",protect,submitcomplaint);

module.exports=router;