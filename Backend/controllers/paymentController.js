const User = require("./../models/userSchema");
const Payments = require("./../models/paymentSchema");
const Bill = require("./../models/billSchema");
const Razorpay = require("razorpay");
const crypto = require("crypto");

exports.createBill = async (req, res) => {
  if (req.user.role !== "secretary") {
    res.status(403).json({ message: "Only secretary can create bills" });
  }
  try {
    const { reason, amount, deadline, month, year } = req.body;
    console.log(reason);
    const members = await User.find({ societyid: req.user.societyid });
    const bill = await Bill.create({
      societyid: req.user.societyid,
      amount,
      reason,
      month,
      year,
      deadline,
      createdBy: req.user._id,
    });
    const payments = members.map((member) => ({
      bill: bill._id,
      user: member._id,
      societyid: req.user.societyid,
      amount,
    }));
    console.log(payments);
    await Payments.insertMany(payments);
    req.io.to(req.user.societyid.toString()).emit("billCreated", bill);
    res.json(bill);
  } catch (err) {
    res.status(500).json({ message: "server down" });
  }
};

exports.getMyPayments = async (req, res) => {
  try {
    const payments = await Payments.find({
      user: req.user._id,
      societyid: req.user.societyid,
    })
      .populate({ path: "bill", select: "reason amount month year deadline" })
      .sort({ createdAt: -1 });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: "server down" });
  }
};

exports.createPaymentOrder = async (req, res) => {
  try {
    const { paymentid } = req.body;
    const payment = await Payments.findById(paymentid).populate("bill");

    if (!payment) {
      return res.status(404).json({ message: "payment not found" });
    }

    //we have to create an instance of razorpay
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: payment.bill.amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await instance.orders.create(options);
    payment.razorpay_order_id = order.id;
    await payment.save();

    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server down" });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const {
      paymentid,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");
    

    if (expected === razorpay_signature) {
      const updated = await Payments.findByIdAndUpdate(
         paymentid,
        {
          status: "paid",
          razorpay_payment_id,
          razorpay_signature,
        },
        { new: true }
      );
      res.json({ success: true });
    } else {
      res.status(400).json({ success: false });
    }
  } catch (err) {
    res.status(500).json({ message: "verification failed" });
  }
};


exports.markPaymentFailed = async (req, res) => {
  try {
    const { paymentid } = req.body;
    const payment = await Payments.findById(paymentid);
    if (!payment) {
      res.status(404).json({ message: "payment not found" });
    }
    payment.status = "failed";
    await payment.save();
    res.json({message:"payment marked failed"})
  } catch (err) {
    res.status(500).json({ message: "server down" });
  }
};
