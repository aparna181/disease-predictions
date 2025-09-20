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
from sklearn.model_selection import GridSearchCV, StratifiedKFold

from src.data.preprocess import feature_selection_pipeline

param_grids = {
    "LogisticRegression": {
        "C": [0.01, 0.1, 1, 10, 100],
        "solver": ["newton-cg", "saga", "lbfgs"],
        "penalty": ["l2", "none"]
    },
    "RandomForest": {
        "n_estimators": [100, 200, 500],
        "max_depth": [None, 10, 20, 30],
        "min_samples_split": [2, 5, 10],
        "min_samples_leaf": [1, 2, 4],
        "bootstrap": [True, False]
    },
    "CatBoost": {
        "iterations": [200, 500],
        "depth": [4, 6, 8, 10],
        "learning_rate": [0.01, 0.05, 0.1],
        "l2_leaf_reg": [1, 3, 5, 7, 9]
    }
}

def tune_model_grid(model, param_grid, x_train, y_train, cv=3):
    grid = GridSearchCV(
        estimator=model,
        param_grid=param_grid,
        scoring="accuracy",
        cv=StratifiedKFold(n_splits=cv, shuffle=True, random_state=42),
        verbose=2,
        n_jobs=-1
    )
    grid.fit(x_train, y_train)
    return grid.best_estimator_, grid.best_params_, grid.best_score_

def train_and_select_model(
    raw_data_path="../data/raw/Training.csv",
    save_model_dir="../models",
    top_n_models=3
):
    df = feature_selection_pipeline(
        path=raw_data_path,
        target="prognosis",
        var_thresh=0.01,
        corr_thresh=0.9,
        top_k=40
    )

    x_train = df.drop(columns=["prognosis"])
    y_train = df["prognosis"]
    le = LabelEncoder()
    y_train = le.fit_transform(y_train)

    df_test = pd.read_csv("../data/raw/Testing.csv")
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

    
    best_models = {}
    for name, _ in top_models_list:
        print(f"Hyperparameter tuning for {name}...")
        tuned_model, best_params, best_score = tune_model_grid(
            models[name], param_grids[name], x_train, y_train
        )
        best_models[name] = {
            "model": tuned_model,
            "best_params": best_params,
            "cv_score": best_score
        }
        print(f"Best {name}: {best_params} (CV Score={best_score:.4f})")

    final_best = max(best_models.items(), key=lambda x: x[1]["cv_score"])
    best_name, best_info = final_best
    print(f"Final Best Model: {best_name} with CV Score {best_info['cv_score']:.4f}")

    model_path = os.path.join(save_model_dir, "final_model.joblib")
    joblib.dump(best_info["model"], model_path)
    joblib.dump(le, "../models/label_encoder.joblib")
