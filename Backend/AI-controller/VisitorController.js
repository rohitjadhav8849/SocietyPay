const Visitor = require("./../models/visitorSchema");
const axios = require("axios");

exports.addVisitor = async (req, res) => {
  try {
    const { name, phone, flat, purpose } = req.body;
    const visitor = await Visitor.create({
      name,
      phone,
      flat,
      purpose,
      societyid: req.user.societyid,
      securityid: req.user._id,
    });
    console.log("Our new visitor is:", visitor);

    res.json(visitor);
  } catch (err) {
    res.status(500).json({ message: "Error Visitor anomaly detection" });
  }
};

exports.detectvisitorRisk = async (req, res) => {
  try {
    const visitors = await Visitor.find({
      societyid: req.user.societyid,
      exitTime: null,
    });

    for (v of visitors) {
      const entryTime = new Date(v.entryTime).getHours();
      const visitorFrequency = await Visitor.countDocuments({
        phone: v.phone,
      });
      const visits = await Visitor.find({
        phone: v.phone,
      });
      const flats = visits.map((x) => `${x.flat.wing}-${x.flat.number}`);
      const uniqueFlats = new Set(flats).size;

      const stayDuration = Math.floor(
        (new Date() - new Date(v.entryTime)) / 60000
      );

      const resp = await axios.post(
        // "http://127.0.0.1:8000/detect-visitor-risk",
        `${MLservice}/detect-visitor-risk`,
        {
          visit_frequency: visitorFrequency,
          entry_hour: entryTime,
          stay_duration: stayDuration,
          unique_flats: uniqueFlats,
        }
      );
      // console.log("AI response for visitor risk:", resp.data);
      v.anomalyRisk = resp.data.risk;

      await v.save();
    }

    const allVisitors = await Visitor.find({ societyid: req.user.societyid });

    const todaysVisitors = allVisitors.filter(
      (v) => new Date(v.entryTime).toDateString() === new Date().toDateString()
    );

    res.json({
      message: "Visitors behavior updated",
      total: visitors.length,
      today: todaysVisitors.length,
    });
  } catch (err) {
    res.status(500).json({ message: "AI service Error" });
  }
};

exports.getVisitorStats = async (req, res) => {
  try {
    const today = new Date();
    const result = [];
    for (let i = 6; i >= 0; i--) {
      const start = new Date();
      start.setDate(today.getDate() - i); //getting every date
      start.setHours(0, 0, 0, 0); //isse vo din raat ke 12 bje set ho jayega
      const end = new Date(start); //getting that day
      end.setHours(23, 59, 59, 999); //from this we are ending that day

      const count = await Visitor.countDocuments({
        societyid: req.user.societyid,
        entryTime: {
          $gte: start,
          $lte: end,
        },
      });
      result.push(Number(count || 0));
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Error fetching visitor stats" });
  }
};

exports.getVisitorInside = async (req, res) => {
  try {
    const visitors = await Visitor.find({
      societyid: req.user.societyid,
      exitTime: null,
    });
    const data = visitors.map((v) => {
      const entryTime = new Date(v.entryTime);
      const now = new Date();
      const duration = Math.floor((now - entryTime) / 60000);
      return {
        _id: v._id,
        name: v.name,
        entryTime: v.entryTime,
        behavior: v.anomalyRisk,
        stayDuration: duration,
      };
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching visitors inside" });
  }
};

exports.allvisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find({ societyid: req.user.societyid }).sort(
      { createdAt: -1 }
    );
    res.json(visitors);
  } catch (err) {
    res.status(500).json({ message: "Error fetching visitors" });
  }
};

exports.visitorHistory = async (req, res) => {
  try {
    const { phone } = req.params;
    const resp = await Visitor.find({
      phone,
      societyid: req.user.societyid,
    }).sort({ creeatedAt: -1 });
    res.json(resp);
  } catch (err) {
    res.status(500).json({ message: "Error fetching visitor history" });
  }
};

exports.visitorIndepth = async (req, res) => {
  try {
    const { visitorid } = req.params;
    const resp = await Visitor.findById(visitorid);
    if (!resp) {
      return res.status(404).json({ message: "visitor not found" });
    }
    res.json(resp);
  } catch (err) {
    res.status(500).json({ message: "Error fetching visitor details" });
  }
};

exports.updateExitTime = async (req, res) => {
  try {
    const { visitorid } = req.params;
    console.log(visitorid);
    const visitor = await Visitor.findById(visitorid);
    if (!visitor) {
      return res.status(404).json({ message: "visitor not found" });
    }
    visitor.exitTime = new Date();
    visitor.save();
    res.json({ message: "Exit time updated" });
  } catch (err) {
    res.status(500).json({ message: "Error updating exit time" });
  }
};
