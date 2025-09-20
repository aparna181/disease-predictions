import os
import joblib
import pandas as pd
import numpy as np


def reset_dict_values(d:dict):
    for key, value in d.items():
        if isinstance(value, np.int64):
            d[key] = int(value)
    return d

def predict(x, model_path, labelEncoder_path, features_path):
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model not found at {model_path}")
    model = joblib.load(model_path)
    le = joblib.load(labelEncoder_path)
    FEATURES = joblib.load(features_path)
    x_df = pd.DataFrame(x, columns=FEATURES)
    pred = model.predict(x_df)
    features = dict(zip(FEATURES, list(x[0])))
    features = reset_dict_values(features)
    return le.inverse_transform(pred)[0], features