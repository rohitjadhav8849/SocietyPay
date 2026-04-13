<div align="center">

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=700&size=28&pause=1000&color=4FC3F7&center=true&vCenter=true&width=700&lines=🏢+SocietyPay;AI-Powered+Society+Management;Built+with+React+Native+%2B+ML" alt="Typing SVG" />

<br/>

[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Razorpay](https://img.shields.io/badge/Razorpay-02042B?style=for-the-badge&logo=razorpay&logoColor=3395FF)](https://razorpay.com/)

<br/>

> **SocietyPay** is a full-stack AI-powered mobile platform for residential society management —
> automating payments, predicting defaulters with ML, routing complaints using NLP,
> and securing visitor entry with real-time anomaly detection.

<br/>

[📱 Features](#-features) • [🤖 AI Services](#-ai-services) • [🏗 Architecture](#-architecture) • [📷 Screenshots](#-screenshots) • [🛡️ Security Module](#%EF%B8%8F-smart-security-visitor-management-system) • [⚙ Setup](#-installation) • [🔮 Roadmap](#-roadmap)

</div>

---

## 💡 The Problem

Managing a residential society is painful:

- 🔴 Maintenance payments are delayed and hard to track across flats
- 🔴 Complaints pile up with no priority, category or routing logic
- 🔴 Secretaries have no visibility into who is likely to default
- 🔴 Communication between residents and management is scattered
- 🔴 Security relies on manual visitor registers with no behavioral intelligence

**SocietyPay solves all of this in one AI-powered mobile platform.**

---

## ✨ Features

| Module | What it does |
|--------|-------------|
| 💳 **Smart Payments** | Secretary generates bills · Members pay via Razorpay · Auto-verification |
| 🤖 **AI Risk Prediction** | ML flags members likely to default before it happens |
| 🧠 **NLP Complaints** | Auto-categorizes, prioritizes & routes complaints to the right person |
| 📊 **Secretary Dashboard** | Live overview — collections, pending dues, risky members |
| 🧾 **Bill Overview** | Itemized billing history for every flat |
| 📢 **Communication Hub** | Announcements, notifications, resident updates |
| 👤 **Member Profiles** | Documents, payment history, AI risk score per member |
| 🛡️ **Visitor Security** | Real-time visitor tracking with ML anomaly detection |

---

## 🤖 AI Services

### 🔴 Payment Risk Prediction

A dedicated Python microservice studies each member's payment behavior and classifies them into risk categories — so the secretary can act **before** a default happens.

```
Inputs  ──▶  Late payments · Missed payments · Payment frequency
Output  ──▶  🟢 Low Risk  |  🟡 Medium Risk  |  🔴 High Risk
Stack   ──▶  Python · FastAPI · Scikit-learn
```

---

### 🧠 NLP Complaint Prioritization

Residents type complaints in plain language. The ML model reads it, understands it, and handles the rest — no manual sorting needed.

```
"Water leaking badly from bathroom pipe"
                    │
          ┌─────────▼──────────┐
          │   NLP Classifier   │
          │   (Naive Bayes)    │
          └─────────┬──────────┘
                    │
       ┌────────────┼─────────────┐
       ▼            ▼             ▼
  Category:     Priority:     Route to:
  Plumbing    🔴 High        Plumber
```

**Live Examples:**

| Complaint | Category | Priority | Assigned To |
|-----------|----------|----------|-------------|
| Water leaking from bathroom | Plumbing | 🔴 High | Plumber |
| Lift making unusual noise | Maintenance | 🟡 Medium | Technician |
| Corridor light not working | Electrical | 🟢 Low | Electrician |
| Garbage not collected | Cleaning | 🟡 Medium | Housekeeping |

---

## 🏗 Architecture

```
┌─────────────────────────────────────┐
│     React Native App (TypeScript)   │
└──────────────┬──────────────────────┘
               │ REST API · JWT Auth
               ▼
┌─────────────────────────────────────┐
│      Node.js / Express Backend      │
│                                     │
│  ┌──────────────┐                   │
│  │   MongoDB    │  ← Mongoose ODM   │
│  └──────────────┘                   │
│                                     │
│  ┌──────────────────────────────┐   │
│  │   Python AI Microservice     │   │
│  │         (FastAPI)            │   │
│  │                              │   │
│  │  ┌─────────────────────┐    │   │
│  │  │ Payment Risk Model  │    │   │
│  │  │   (Scikit-learn)    │    │   │
│  │  └─────────────────────┘    │   │
│  │                              │   │
│  │  ┌─────────────────────┐    │   │
│  │  │  NLP Complaint      │    │   │
│  │  │  Classifier         │    │   │
│  │  │  (Naive Bayes)      │    │   │
│  │  └─────────────────────┘    │   │
│  └──────────────────────────────┘   │
└─────────────────────────────────────┘
```

---

## 🛠 Tech Stack

```
📱 Mobile        →  React Native · TypeScript
🖥  Backend       →  Node.js · Express.js · JWT
🗄  Database      →  MongoDB · Mongoose
💳 Payments      →  Razorpay API
🤖 AI / ML       →  Python · FastAPI · Scikit-learn
🧠 NLP           →  Naive Bayes · CountVectorizer
```

---

## 📷 Screenshots

### 🏠 Home & Dashboard
| Home Screen | Secretary Dashboard | Bill Overview |
|:-----------:|:------------------:|:-------------:|
| ![Home](ScreenShots/HomePage.jpeg) | ![Dashboard](ScreenShots/dashboard.jpeg) | ![Bills](ScreenShots/billOverview.jpeg) |

### 💳 Payments & History
| Pay Screen | Payment History |
|:----------:|:--------------:|
| ![Pay](ScreenShots/Pay.jpeg) | ![History](ScreenShots/History.jpeg) |

### 🤖 AI Features
| AI Risk Analysis | Complaint System |
|:---------------:|:---------------:|
| ![AIRisk](ScreenShots/AIRisk.jpeg) | ![Issues](ScreenShots/Issues.jpeg) |

### 📢 Communication
| Notifications | Announcements | Communication Hub |
|:------------:|:-------------:|:-----------------:|
| ![Notif](ScreenShots/Notifications.jpeg) | ![Ann](ScreenShots/Announcement.jpeg) | ![Hub](ScreenShots/communicationHub.jpeg) |

---

## 🎥 Demo Videos

| Payment Flow | AI Complaint Risk |
|:-----------:|:-----------------:|
| [▶ Watch Payment Demo](ScreenShots/Payment.mp4) | [▶ Watch AI Demo](ScreenShots/ComplaintRisk.mp4) |

---

## ⚙ Installation

### Prerequisites
- Node.js ≥ 18
- Python ≥ 3.10
- Android Studio / Xcode
- MongoDB running locally or Atlas URI

### 1. Clone
```bash
git clone https://github.com/rohitjadhav8849/SocietyPay.git
cd SocietyPay
```

### 2. Backend
```bash
cd Backend
npm install
# Add your .env (MongoDB URI, JWT Secret, Razorpay keys)
npm run dev
```

### 3. Mobile App
```bash
cd NewSocietyPay
npm install
npx react-native run-android
```

### 4. AI Microservice
```bash
cd AI-service
pip install -r requirements.txt
python main.py
```

---

---

# 🛡️ Smart Security Visitor Management System

<div align="center">

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=700&size=22&pause=1000&color=1D9E75&center=true&vCenter=true&width=700&lines=🛡️+SecuritySS;AI-Powered+Visitor+Tracking;Real-Time+Anomaly+Detection+%2B+ML" alt="Typing SVG" />

<br/>

[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![IsolationForest](https://img.shields.io/badge/Isolation_Forest-FF6B35?style=for-the-badge&logo=python&logoColor=white)](https://scikit-learn.org/)

<br/>

> A production-level full-stack mobile application designed to manage, monitor, and intelligently
> analyze visitor behavior in residential societies using real-time data + machine learning.

</div>

---

### 📌 Problem Statement

Traditional society security systems rely on manual registers or basic apps that:

- ❌ Do not track visitor behavior over time
- ❌ Cannot detect suspicious patterns automatically
- ❌ Lack real-time monitoring capabilities
- ❌ Provide no analytics or insights for decision-making

👉 This module solves that by combining **mobile technology + backend intelligence + ML-based anomaly detection**.

---

### 💡 Solution Overview

A smart security dashboard where guards can:

- Track visitor entries & exits with automatic timestamps
- Monitor all current visitors inside the society in real time
- Detect suspicious behavior automatically using ML
- Visualize weekly visitor trends via interactive charts
- Get behavior risk updates every 10 minutes automatically

---

### 🚀 Core Features

#### 🔐 1. Security Dashboard — Real-Time Monitoring

- Displays all visitors currently inside the society
- Shows for each visitor:
  - 👤 Name
  - ⏱ Entry Time
  - ⌛ Duration inside
  - ⚠️ Behavior flag — `Normal` or `Suspicious`
- Auto-refresh every 10 minutes
- Designed for quick guard decision-making

---

#### 📊 2. Visitor Analytics — Graph System

- Weekly visitor trends visualized as a line chart
- Data fetched dynamically from backend
- Handles edge cases:
  - Missing days filled with 0
  - Data normalization applied
  - Stable Mon → Sun ordering enforced
- NaN-safe rendering — prevents UI crashes

---

#### 🧾 3. Visitor Management System

- Add new visitor with:
  - Name, Phone number
  - Flat — Wing + Number
  - Purpose of visit
- Automatic entry timestamp on creation
- Exit tracking with one tap
- Full visit history stored in database

---

#### 📜 4. Visitor History & Detail View

- View complete visit logs for any visitor
- Tap any visitor to see:
  - All previous visits
  - Stay durations per visit
  - Flats visited
  - Behavior risk analysis over time

---

#### 🧠 5. AI-Based Anomaly Detection _(Key Highlight 🚨)_

The system analyzes visitor behavior using multiple behavioral features:

**Features used by the ML model:**

| Feature | Description |
|---------|-------------|
| Visit frequency | How many times the same person has visited |
| Entry time patterns | Whether entry happens at odd/unusual hours |
| Stay duration | Whether the stay is too long or too short |
| Unique flats visited | How many different flats the visitor has accessed |

**Detection Flow:**

```
Guard logs visitor entry
         │
         ▼
Backend saves to MongoDB
         │
         ▼
Backend calls Python ML API
         │
         ▼
┌────────────────────────────┐
│   Isolation Forest Model   │
│   (Unsupervised ML)        │
│                            │
│  Analyzes 4 features:      │
│  · Visit frequency         │
│  · Entry hour              │
│  · Stay duration           │
│  · Unique flats visited    │
└────────────┬───────────────┘
             │
      ┌──────┴──────┐
      ▼             ▼
  ✅ Normal    ⚠️ Suspicious
  (stored as anomalyRisk in DB)
```

---

#### 🔄 6. Live Behavior Tracking System

- Tracks visitors who have not yet exited
- Backend API re-runs every 10 minutes and:
  - Updates stay duration
  - Re-scores anomaly risk
- Ensures real-time suspicious behavior detection without manual refresh

---

### 🧠 System Architecture — SecuritySS

```
┌─────────────────────────────────────┐
│     React Native App (TypeScript)   │
│     react-native-chart-kit          │
└──────────────┬──────────────────────┘
               │ REST API · JWT Auth
               ▼
┌─────────────────────────────────────┐
│      Node.js / Express Backend      │
│                                     │
│  ┌──────────────┐                   │
│  │   MongoDB    │  ← Mongoose ODM   │
│  └──────────────┘                   │
│                                     │
│  ┌──────────────────────────────┐   │
│  │   Python ML API              │   │
│  │   (Flask / FastAPI)          │   │
│  │                              │   │
│  │  ┌─────────────────────┐    │   │
│  │  │  Isolation Forest   │    │   │
│  │  │  Anomaly Detector   │    │   │
│  │  └─────────────────────┘    │   │
│  └──────────────────────────────┘   │
│                                     │
│  ⏱ 10-min interval refresh job     │
└─────────────────────────────────────┘
```

---

### 🛠️ Tech Stack — SecuritySS

```
📱 Mobile        →  React Native · TypeScript · react-native-chart-kit
🖥  Backend       →  Node.js · Express.js · MongoDB (Mongoose) · JWT
🤖 ML            →  Python · Flask / FastAPI · Isolation Forest (Scikit-learn)
🔄 Refresh       →  Interval-based job · 10-minute auto re-scoring
```

---

### 📂 Database Schema — Visitor

```json
{
  "name": "String",
  "phone": "String",
  "flat": {
    "wing": "String",
    "number": "String"
  },
  "purpose": "String",
  "entryTime": "Date",
  "exitTime": "Date",
  "societyid": "ObjectId",
  "securityid": "ObjectId",
  "anomalyRisk": "String"
}
```

---

### 🔌 Key APIs — SecuritySS

#### 📍 Visitor APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/visitor/add` | Add new visitor entry |
| `PUT` | `/visitor/exit/:id` | Mark visitor as exited |
| `GET` | `/visitor/history` | Full visit history |
| `GET` | `/insidevisitors` | All current visitors inside |

#### 🤖 ML APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/detect-visitor` | Detect anomaly for a single visitor |
| `GET` | `/detect-visitor-risk` | Re-score all active visitors |

#### 📊 Analytics APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/visitorstats` | Weekly visitor graph data |

---

### 📷 Screenshots — SecuritySS

| Security Home | Indepth Visitor | Security Profile |
|:------------:|:---------------:|:----------------:|
| ![SecurityHome](SecuritySS/SecurityHome.jpeg) | ![IndepthVisitor](SecuritySS/Indepthvisitor.jpeg) | ![SecurityProfile](SecuritySS/SecurityProfile.jpeg) |

| Visitor Details | Visitor History |
|:--------------:|:---------------:|
| ![VisitorDetails](SecuritySS/VisitorDetails.jpeg) | ![VisitorHistory](SecuritySS/VisitorHistory.jpeg) |

---

### ⚙️ Installation — SecuritySS

#### Prerequisites
- Node.js ≥ 18
- Python ≥ 3.10
- Android Studio / Xcode
- MongoDB running locally or Atlas URI

#### 1. Clone
```bash
git clone https://github.com/rohitjadhav8849/SocietyPay.git
cd SocietyPay/SecuritySS
```

#### 2. Backend
```bash
cd backend
npm install
npm start
```

#### 3. Frontend
```bash
cd frontend
npm install
npx react-native run-android
```

#### 4. ML Server
```bash
cd ml-service
pip install -r requirements.txt
python app.py
```

#### 5. Environment Variables

Create `.env` in the backend folder:

```env
MONGO_URI=your_mongodb_url
PORT=5000
ML_API_URL=http://127.0.0.1:8000
```

---

### ⚠️ Challenges Faced & Solutions

#### ❌ Chart Crashing with NaN Values
- **Cause:** Undefined or NaN values passed to the chart library
- **Fix:** Full data sanitization layer — missing days fill with `0`, stable Mon→Sun ordering enforced, NaN-safe rendering throughout

#### ❌ Real-Time Behavior Tracking
- **Cause:** No mechanism to continuously update visitor risk without user refresh
- **Fix:** Interval-based API refresh — backend re-scores all active visitors every 10 minutes automatically

#### ❌ ML Data Quality for Anomaly Detection
- **Cause:** Raw visitor data was noisy and inconsistent
- **Fix:** Feature engineering (visit frequency, entry hour, stay duration, unique flats) + data normalization before Isolation Forest inference

---

### 🔥 Future Enhancements — SecuritySS

- 🔔 Push notifications for suspicious visitor detection
- 📸 Face recognition integration for visitor identification
- 📍 GPS-based visitor tracking
- 📊 Advanced ML model using Deep Learning
- 🧠 Predictive risk scoring before entry

---

## 🔮 Roadmap

### ✅ Completed
- [x] Smart payment system with Razorpay
- [x] AI payment risk prediction (Scikit-learn)
- [x] NLP complaint categorization & routing (Naive Bayes)
- [x] Secretary dashboard with live stats
- [x] Communication hub (announcements + notifications)
- [x] Visitor entry / exit tracking system
- [x] AI anomaly detection — Isolation Forest (Unsupervised ML)
- [x] Weekly visitor analytics chart
- [x] Live behavior tracking with 10-minute auto-refresh

### 🔲 Upcoming
- [ ] AI payment reminder bot
- [ ] Smart maintenance prediction
- [ ] Push notifications for suspicious visitors
- [ ] Face recognition for visitor identification
- [ ] GPS-based visitor tracking
- [ ] Deep learning risk model
- [ ] Real-time society chat

---

## 👨‍💻 Author

<div align="center">

**Rohit Jadhav**
*NIT Silchar (3rd Year) · Full Stack Developer · AI/ML Enthusiast*

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/your-profile)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/rohitjadhav8849)

</div>

---

<div align="center">

**⭐ Star this repo if you found it useful — it motivates me to keep building! 🚀**

*Built with ❤️ at NIT Silchar*

</div>