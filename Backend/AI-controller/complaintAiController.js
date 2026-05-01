const axios = require("axios");
const Complaint = require("./../models/complaintSchema");

exports.analyzecomplaint = async (req, res) => {
  try {
    const { complaint } = req.body;
    const response = await axios.post(
      // "http://127.0.0.1:8000/analyze-complaint",
      `${MLservice}/analyze-complaint`,
      {
        complaint,
      }
    );
    res.json(response);
  } catch (err) {
    res.status(500).json({ message: "complaint error" });
  }
};

exports.submitcomplaint = async (req, res) => {
  try {
    const { complaint } = req.body;
    const response = await axios.post(
      // "http://127.0.0.1:8000/analyze-complaint",
      `${MLservice}/analyze-complaint`,
      {
        complaint,
      }
    );
    

    const problem = await Complaint.create({
      society: req.user.societyid,
      user: req.user._id,
      text:complaint,
      category: response.data.category,
      priority: response.data.priority,
    });
    console.log(problem);
    res.json(problem);
  } catch (err) {
    res.status(500).json({ message: "error complaint submission" });
  }
};

exports.getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      society: req.user.societyid,
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: "Error in fetching complaints" });
  }
};
