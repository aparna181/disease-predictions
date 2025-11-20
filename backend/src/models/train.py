import os
import joblib
import pandas as pd
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import LabelEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier
from lightgbm import LGBMClassifier
from catboost import CatBoostClassifier

class Train:
    def __init__(self):
        self.raw_training_csv_path = f"{os.getenv('RAW_CSV_PATH')}/Training.csv"
        self.raw_testing_csv_path = f"{os.getenv('RAW_CSV_PATH')}/Testing.csv"
        self.preprocessed_training_csv_path = f"{os.getenv('PROCESSED_CSV_PATH')}/clean_training.csv"
        self.preprocessed_testinging_csv_path = f"{os.getenv('PROCESSED_CSV_PATH')}/clean_testing.csv"
        self.MODEL_PATH = os.getenv('MODEL_PATH')
        self.LABEL_ENCODER_PATH = os.getenv('LABEL_ENCODER_PATH')
        self.FEATURES_PATH = os.getenv('FEATURES_PATH')

    def train_and_save_model(self, df: pd.DataFrame, top_n_models: int = 3):
        x_train = df.drop(columns=["prognosis"])
        y_train = df["prognosis"]
        le = LabelEncoder()
        y_train = le.fit_transform(y_train)

        df_test = pd.read_csv(self.raw_testing_csv_path)
        x_test = df_test[list(x_train.columns)]
        y_test = df_test["prognosis"]
        y_train = le.transform(y_test)

        models = {
            "LogisticRegression": LogisticRegression(max_iter=1000, multi_class="multinomial"),
            "RandomForest": RandomForestClassifier(n_estimators=200, random_state=42),
            "XGBoost": XGBClassifier(use_label_encoder=False, eval_metric="mlogloss", random_state=42),
            "LightGBM": LGBMClassifier(random_state=42),
            "CatBoost": CatBoostClassifier(verbose=0, random_state=42)
        }

        results = {}
        for name, model in models.items():
            print(f"\nTraining {name}...")
            model.fit(x_train, y_train)
            preds = model.predict(x_test)
            acc = accuracy_score(y_test, preds)
            results[name] = acc
            print(f"{name} Accuracy: {acc:.4f}")

        top_models_list = sorted(results.items(), key=lambda x: x[1], reverse=True)[:top_n_models]
        print(f"Top {top_n_models} models:", top_models_list)

        best_model = models[top_models_list[-1][0]]
        joblib.dump(best_model, "models/final_model.joblib")
        joblib.dump(le, "models/label_encoder.joblib")
