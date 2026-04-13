🛡️ Smart Security Visitor Management System

AI-Powered Society Visitor Tracking & Risk Detection

A production-level full-stack mobile application designed to manage, monitor, and intelligently analyze visitor behavior in residential societies using real-time data + machine learning.

---

📌 Problem Statement

Traditional society security systems rely on manual registers or basic apps that:

- ❌ Do not track visitor behavior over time
- ❌ Cannot detect suspicious patterns
- ❌ Lack real-time monitoring
- ❌ Provide no analytics or insights

👉 This project solves that by combining mobile technology + backend intelligence + ML-based anomaly detection.

---

💡 Solution Overview

This system provides a smart security dashboard where guards can:

- Track visitor entries & exits
- Monitor current visitors inside the society
- Detect suspicious behavior using ML
- Visualize weekly visitor trends
- Get real-time updates every 10 minutes

---

🚀 Core Features

🔐 1. Security Dashboard (Real-Time Monitoring)

- Displays all visitors currently inside
- Shows:
  - 👤 Name
  - ⏱ Entry Time
  - ⌛ Duration inside
  - ⚠️ Behavior (Normal / Suspicious)
- Auto-refresh every 10 minutes
- Designed for quick decision-making by guards

---

📊 2. Visitor Analytics (Graph System)

- Weekly visitor trends using line chart
- Data fetched dynamically from backend
- Handles:
  - Missing days (fills with 0)
  - Data normalization
  - Stable Mon → Sun ordering
- Prevents UI crashes (NaN-safe handling)

---

🧾 3. Visitor Management System

- Add new visitor with:
  - Name
  - Phone number
  - Flat (Wing + Number)
  - Purpose
- Automatic entry timestamp
- Exit tracking system
- Full visit history stored in database

---

📜 4. Visitor History & Detail View

- View complete visit logs
- Click on any visitor to see:
  - All previous visits
  - Stay durations
  - Flats visited
  - Behavior analysis

---

🧠 5. AI-Based Anomaly Detection (Key Highlight 🚨)

The system analyzes visitor behavior using multiple features:

🔍 Features Used:

- Visit frequency (same person multiple times)
- Entry time patterns (odd hours)
- Stay duration (too long / too short)
- Number of unique flats visited

⚙️ Flow:

1. Backend collects visitor data
2. Sends data to ML API
3. ML model predicts risk
4. Result stored in DB ("anomalyRisk")
5. Displayed in frontend

🏷 Output:

- ✅ Normal
- ⚠️ Suspicious

---

🔄 6. Live Behavior Tracking System

- Tracks visitors who have not exited
- Continuously updates:
  - Duration
  - Risk behavior
- Backend API runs every 10 minutes
- Ensures real-time anomaly detection

---

🧠 System Architecture

React Native App
        ↓
Node.js + Express Backend
        ↓
MongoDB Database
        ↓
Python ML API (Anomaly Detection)

---

🛠️ Tech Stack

📱 Frontend

- React Native
- TypeScript
- react-native-chart-kit

🌐 Backend

- Node.js
- Express.js
- MongoDB (Mongoose)

🤖 Machine Learning

- Python
- Flask / FastAPI
- Custom anomaly detection logic

---

📂 Database Schema (Visitor)

{
  name: String,
  phone: String,
  flat: {
    wing: String,
    number: String
  },
  purpose: String,
  entryTime: Date,
  exitTime: Date,
  societyid: ObjectId,
  securityid: ObjectId,
  anomalyRisk: String
}

---

🔌 Key APIs

📍 Visitor APIs

- "POST /visitor/add" → Add visitor
- "PUT /visitor/exit/:id" → Mark exit
- "GET /visitor/history" → Full history

🤖 ML APIs

- "POST /detect-visitor" → Detect anomaly
- "GET /detect-visitor-risk" → Update all visitors

📊 Analytics APIs

- "GET /visitorstats" → Weekly graph data
- "GET /insidevisitors" → Current visitors inside

---

⚙️ Setup Instructions

1️⃣ Clone Repo

git clone https://github.com/YOUR_USERNAME/security-visitor-app.git
cd security-visitor-app

---

2️⃣ Backend Setup

cd backend
npm install
npm start

---

3️⃣ Frontend Setup

cd frontend
npm install
npx react-native run-android

---

4️⃣ ML Server

cd ml-service
pip install -r requirements.txt
python app.py

---

🔐 Environment Variables

Create ".env" in backend:

MONGO_URI=your_mongodb_url
PORT=5000
ML_API_URL=http://127.0.0.1:8000

---

⚠️ Challenges Faced & Solutions

❌ Chart Crashing Issue

- Cause: NaN / undefined values
- Fix: Data sanitization + fixed ordering

❌ Real-Time Behavior Tracking

- Solved using interval-based API refresh

❌ ML Data Quality Issue

- Improved by:
  - Feature engineering
  - Data normalization

---

🔥 Future Enhancements

- 🔔 Push notifications for suspicious visitors
- 📸 Face recognition integration
- 📍 GPS-based tracking
- 📊 Advanced ML model (Deep Learning)
- 🧠 Predictive risk scoring

---

📈 Impact

- Improves security awareness
- Reduces manual errors
- Enables data-driven decisions
- Adds intelligence to traditional systems

---

👨‍💻 Author

Rohit Jadhav
🎓 NIT Silchar (3rd Year)
💻 Full Stack Developer | ML Enthusiast

---

⭐ If you like this project

Give it a star ⭐ on GitHub — it helps a lot!