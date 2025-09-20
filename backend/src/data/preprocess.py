import pandas as pd
import numpy as np
from sklearn.feature_selection import VarianceThreshold, SelectKBest, chi2

def load_and_clean(path, target="prognosis"):
    df = pd.read_csv(path).drop_duplicates()
    df = df.drop(columns=[c for c in df.columns if "Unnamed" in c], errors="ignore")

    # droped "fluid_overload" as it has constant value 
    df.drop("fluid_overload", axis=1, inplace=True)

    # Rename "fluid_overload.1" as "fluid_overload" 
    df.rename(columns={"fluid_overload.1": "fluid_overload"}, inplace=True)
    
    drop_cols = [
    "belly_pain", "stomach_pain", "muscle_weakness", "muscle_wasting", "family_history", "extra_marital_contacts", 
    "receiving_blood_transfusion", "receiving_unsterile_injections", "history_of_alcohol_consumption" ]
    df = df.drop(columns=drop_cols, errors="ignore")
    x = df.drop(columns=[target])
    y = df[target]

    print(f"Loaded {path} | Shape: {df.shape}")
    return x, y

def remove_low_variance_features(x: pd.DataFrame, threshold=0.01):
    var_thresh = VarianceThreshold(threshold=threshold)
    x_var = var_thresh.fit_transform(x)
    x_var = pd.DataFrame(x_var, columns=x.columns[var_thresh.get_support()])
    print(f"Low-variance filter: {x.shape[1]} -> {x_var.shape[1]} features")
    return x_var

def remove_highly_correlated(x:pd.DataFrame, threshold=0.9):
    corr_matrix = x.corr().abs()
    upper = corr_matrix.where(np.triu(np.ones(corr_matrix.shape), k=1).astype(bool))
    to_drop = [col for col in upper.columns if any(upper[col] > threshold)]
    x_uncorr = x.drop(columns=to_drop)
    print(f"Removed {len(to_drop)} highly correlated features")
    return x_uncorr

def select_k_best_features(x:pd.DataFrame, y:pd.DataFrame, k=40):
    selector = SelectKBest(score_func=chi2, k=k)
    x_best = selector.fit_transform(x, y)
    best_cols = x.columns[selector.get_support()]
    print(f"Selected top {k} features")
    return pd.DataFrame(x_best, columns=best_cols)

def feature_selection_pipeline(path, target="prognosis", var_thresh=0.01, corr_thresh=0.9, top_k=40):
    x, y = load_and_clean(path, target=target)
    x = remove_low_variance_features(x, threshold=var_thresh)
    x = remove_highly_correlated(x, threshold=corr_thresh)
    x_best = select_k_best_features(x, y, k=top_k)

    x_best[target] = y.values

    return x_best
