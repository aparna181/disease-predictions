
# 🏥 Disease Prediction App

A machine learning powered **disease prediction system** built with **FastAPI** (backend), **React + Vite** (frontend), and **MongoDB** (database).  
This project was developed for a hackathon and is also optimized to showcase in resumes.

---

## 🚀 Tech Stack

- **Frontend**: React (Vite, TailwindCSS, Recharts/Chart.js, Dark & Light mode support)
- **Backend**: FastAPI (Python, Joblib/Pickle for ML model loading)
- **Database**: MongoDB (Prediction logs, stats, and user history)
- **Deployment**: Vercel (frontend) + Render/Heroku (backend) + MongoDB Atlas

---

## 📂 Project Structure

```
backend/
│── data/                # Dataset
│   ├── processed/
│   │   ├── clean_training.csv
│   │   └── clean_testing.csv
│   └── raw/
│       ├── Training.csv
│       └── Testing.csv
|
│── models/              # Joblib Files
│   ├── features.joblib
│   ├── final_model.joblib
│   └── label_encoder.joblib
|
│── Notebook/            # Jupyter Notebook Files
│   ├── data_preparation.ipynb
│   ├── EDA.ipynb
│   └── model_training.ipynb
|
│── src/
│   ├── app.py           # FastAPI entry point
│   ├── db/              # Database
│   │   └── db.py        # MongoDB connection
│   ├── data/            # DataPreprocess
│   │   ├── __init__.py
│   │   └── preprocess.py 
│   ├── models/
│   │   ├── __init__.py
│   │   ├── predict.py
│   │   └── train.py 
│   ├── utils/
│   │   ├── __init__.py
│   │   └── helper.py
│   ├── routes/          # API routes
│   │   ├── predict.py   # Prediction endpoint
│   │   ├── stats.py     # Stats endpoint
│   │   └── logs.py      # Logs endpoint
│   └── models.py        # Pydantic models
│
frontend/
│── public/
└── src/
    ├── components/      # React components (Charts, Layout, Sidebar, Footer)
    ├── pages/           # Pages (Home, Predict, Logs)
    ├── constants/       # Constant data (common diseases, symptoms)
    ├── hooks/           # for theme
    ├── services/        # For api integration
    ├── utils/           # For helper functions
    └── App.jsx          # Main React entry
```

---

## ⚡ Features

- Disease prediction based on **133 binary symptom features**
- Supports **multi-class classification (41 diseases)**
- **FastAPI REST API** for predictions
- **Logs stored in MongoDB** (with timestamps)
- **Stats endpoint** → correct, incorrect, not reviewed
- **Frontend UI**:
  - Sidebar navigation (Home, Predict, Logs)
  - Light/Dark theme toggle
  - Charts for common diseases & symptoms
  - Logs table with option to download as CSV (handled in frontend)

---

## 🛠 How to Run

### Backend (FastAPI)
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python src/app.py --reload
```

### Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```

---

## 📊 API Endpoints

- `POST /predict` → Make a prediction
- `GET /stats` → Get prediction statistics
- `GET /logs` → Get all logs (history)
- `PUT /logs/{id}` → Update status (correct/incorrect)

---

## 👨‍💻 Author
- Aparna Swain
                                                        
                   