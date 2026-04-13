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

const {
   addVisitor,
   detectvisitorRisk,
   allvisitors,
   visitorHistory,
   updateExitTime,
   visitorIndepth,
   getVisitorInside,
   getVisitorStats
}= require("./../AI-controller/VisitorController");

router.get("/ai/predict/:userid",protect,predictPaymentRisk);
router.post("/ai/analyze-complaint",protect,analyzecomplaint);
router.get("/ai/complaints",protect,getComplaints);
router.post("/ai/submitcomplaint",protect,submitcomplaint);

router.post("/ai/security/add",protect,addVisitor);
router.get("/ai/security/getvisitors",protect,allvisitors);
router.get("/ai/security/visitor/:visitorid",protect,visitorIndepth);//working
router.get("/ai/security/detect-visitor-risk",protect,detectvisitorRisk);//working
router.get("/ai/security/insidevisitors",protect,getVisitorInside);
router.get("/ai/security/visitorstats",protect,getVisitorStats);

router.get("/ai/security/getvisitorhistory/:phone",protect,visitorHistory);
router.get("/ai/security/updateexit/:visitorid",protect,updateExitTime);


module.exports=router;