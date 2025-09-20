from fastapi import APIRouter
from pydantic import BaseModel
import numpy as np
from db.db import collection

from models.predict import predict
from utils.helpers import add_log

router = APIRouter()

MODEL_PATH = "models/final_model.joblib"
LABEL_ENCODER_PATH = "models/label_encoder.joblib"
FEATURES_PATH = "models/features.joblib"

class SymptomsInput(BaseModel):
    features: list[int]


@router.get("/")
def home():
    return {
        "message": "Welcome to Disease Prediction API",
        "predict": "/predict",
        "all_logs": "/get-logs",
        "update_status": "/add-status",
        "stats": "/addstats",
    }

@router.post("/predict")
def predict_disease(data: SymptomsInput):
    x = np.array(data.features).reshape(1, -1)
    pred, features = predict(x, MODEL_PATH, LABEL_ENCODER_PATH, FEATURES_PATH)
    record = add_log(features, str(pred), collection)
    return {
        "predicted_class": str(pred),
        "log_id": str(record) 
    }
