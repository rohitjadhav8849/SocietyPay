const express=require("express");
const router=express.Router();
const {protect} =require("../middleware/authmiddleware");

const {
  getSocietyMembers,
  getAllScoities,
  verifyMember,
  getMemberDetails,
  sendMessage,
  getMessage,
  getAnnouncement,
  sendAnnouncement,
  pinAnnouncement,
  unpinAnnouncement,
  editAnnouncement,
  deleteAnnouncement,
  sendpin
}= require("../controllers/societyController");

const {
  createBill,
  getMyPayments,
  createPaymentOrder,
  verifyPayment,
  markPaymentFailed
} = require("../controllers/paymentController");

const {
  sendBills,
  sendDetails,
  getMyPayment
} =require("./../controllers/historycontroller");

const {
  sendNotifications,
  createNotification,
  markread
} =require("./../controllers/notificationController");

const {getSocietyDasboard}=require("./../controllers/Dashboardcontroler")

router.patch("/documents/verify",protect,verifyMember);
router.get("/members",protect,getSocietyMembers);//gives all society members data
router.get("/all",getAllScoities);
router.get("/member/:id",protect,getMemberDetails);
router.post("/chat",protect,sendMessage);
router.get("/chat",protect,getMessage);
router.get("/announcement",protect,getAnnouncement);
router.post("/announcement",protect,sendAnnouncement);
router.put("/announcement/pin/:id",protect,pinAnnouncement);
router.put("/announcement/unpin/:id",protect,unpinAnnouncement);
router.put("/announcement/edit/:id",protect,editAnnouncement);
router.delete("/announcement/delete/:id",protect,deleteAnnouncement);
router.get("/getPinchat",protect,sendpin);

router.get("/payment/my",protect,getMyPayments);
router.post("/bill/create",protect,createBill);
router.post("/payment/order/:paymentid",protect,createPaymentOrder);
router.post("/payment/create-order",protect,createPaymentOrder);
router.post("/payment/verify",protect,verifyPayment);
router.post("/payment/failed",protect,markPaymentFailed);

router.get("/bills/:societyid",protect,sendBills);
router.get("/bills/indepth/:billid",protect,sendDetails);
router.get("/history/member/:userid",protect,getMyPayment);

router.get("/notification/my/",protect,sendNotifications);
router.post("/notification/send",protect,createNotification);
router.patch("/notification/read/:id",protect,markread);

router.get("/dashboard",protect,getSocietyDasboard);

module.exports=router;