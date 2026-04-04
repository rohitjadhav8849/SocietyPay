from fastapi import FastAPI
from sklearn.linear_model import LogisticRegression
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB

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