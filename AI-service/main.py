from fastapi import FastAPI
from sklearn.linear_model import LogisticRegression
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB

from sklearn.ensemble import IsolationForest
import random

app = FastAPI()
# dummy training data
# data is LatePayments,MissedPayments
X= np.array([
  [0,0],
  [1,0],
  [2,1],
  [4,1],
  [6,2],
  [8,3]
  ])
y= np.array([0,0,1,1,1,1])
model=LogisticRegression()
model.fit(X,y)

# training data
texts=[
  "water leaking from pipe",
  "bathroom water leakage",
  "bathroom pipe water",
  "fire heat",
  "elevator stuck",
  "lift not working",
  "electric short circuit",
  "parking issue",
  "garbage not cleaned",
  "gas leakage in kitchen",
  "garbage overflowing",
  "bad smell",
  "broken light in corridor"
]
labels=[
  "plumbing",
  "plumbing",
  "plumbing",
  "emergency fire",
  "electrical",
  "electrical",
  "electrical",
  "parking",
  "cleaning",
  "plumbing",
  "cleaning",
  "cleaning",
  "electrical"
]
# s-1 convert text to numbers
vectorizer=TfidfVectorizer()
P= vectorizer.fit_transform(texts)
model_text=MultinomialNB()
model_text.fit(P,labels)

@app.get("/")
def home():
    return {"message":"AI service running"}

@app.post("/predict-payment-risk")
def predict(data:dict):

  late_payments= data["late_payments"]
  missed_payments=data["missed_payments"]

  prediction = model.predict([[late_payments,missed_payments]])

  return {"risk":int(prediction[0])}

@app.post("/analyze-complaint")
def analyze(data:dict):
    text=data["complaint"]

    vec=vectorizer.transform([text])
    category=model_text.predict(vec)[0]

    #priority rules
    if "gas" in text or "leak" in text or "electrical" in text:
        priority="high"
    elif "lift" in text or "garbage" in text:
        priority="medium"
    else:
        priority="low"
      
    return {
      "category":category,
      "priority":priority
    }

trainingData=[]
for i in range(90):
    visit_frequency= random.randint(1,3)
    entry_hour=random.randint(16,21)
    stay_duration=random.randint(10,60)
    unique_flats=1
    trainingData.append([
      visit_frequency,
      entry_hour,
      stay_duration,
      unique_flats
    ])

for i in range(10):
    visit_frequency=random.randint(8,15)
    entry_hour=random.choice([22,24,0,1,2,3])
    stay_duration=random.randint(90,180)
    unique_flats=random.randint(2,5)
    trainingData.append([
      visit_frequency,
      entry_hour,
      stay_duration,
      unique_flats
    ])

fullData= np.array(trainingData)
model = IsolationForest(contamination=0.1)
model.fit(fullData)

@app.post("/detect-visitor-risk")
def detect(data:dict):
    features=[
        data["visit_frequency"],
        data["entry_hour"],
        data["stay_duration"],
        data["unique_flats"]
    ]
    prediction = model.predict([features])[0]
    if prediction==-1:
        return {"risk":"anomaly"}
    else:
        return {"risk":"normal"}