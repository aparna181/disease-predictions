import os
import joblib
import pandas as pd
import numpy as np

from src.data.preprocess import Preprocess

class Predict(Preprocess):
    def __init__(self):
        super().__init__()
    
    def predict(self, data, is_train=True):
        x_test = self.preprocess_data(data, is_train)
        if not os.path.exists(self.MODEL_PATH):
            raise FileNotFoundError(f"Model not found at {self.MODEL_PATH}")
        model = joblib.load(self.MODEL_PATH)
        le = joblib.load(self.LABEL_ENCODER_PATH)
        pred = model.predict(x_test)
        return le.inverse_transform(pred)[0]
