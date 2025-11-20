from fastapi import APIRouter
from pydantic import BaseModel
from typing import Dict, Any
import numpy as np
from src.models.predict import Predict
from src.db.db import DB
from src.utils.helpers import Helpers

router = APIRouter()
predict = Predict()
db = DB()
helper = Helpers(db)

MODEL_PATH = "models/final_model.joblib"
LABEL_ENCODER_PATH = "models/label_encoder.joblib"
FEATURES_PATH = "models/features.joblib"

class SymptomsInput(BaseModel):
    features: Dict[str, Any]


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
    pred = predict.predict(data.features, is_train=False)
    record_id = helper.add_log(data.features, str(pred))
    return {
        "predicted_class": str(pred),
        "log_id": str(record_id) 
    }
