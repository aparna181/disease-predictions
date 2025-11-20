import os
import pandas as pd
import joblib

from src.models.train import Train 

class Preprocess(Train):
    def __init__(self):
        super().__init__()

    def merge_and_drop_col(self, df, col1, col2):
        df[col1] = df[col1] | df[col2]
        df = df.drop(columns=[col2])
        return df

    def preprocess_data(self, data, is_train=True, target="prognosis"):
        x_test = pd.DataFrame([data])

        if is_train:
            # Reading cev file
            df = pd.read_csv(self.raw_training_csv_path).drop_duplicates()
            df = df.drop(columns=[c for c in df.columns if "Unnamed" in c], errors="ignore")

            # droped "fluid_overload" as it has constant value 
            df.drop("fluid_overload", axis=1, inplace=True)

            # Rename "fluid_overload.1" as "fluid_overload" 
            df.rename(columns={"fluid_overload.1": "fluid_overload"}, inplace=True)
            
            # Removing duplicate rows.
            df = df.drop_duplicates()

            # Columns with similar name
            similar_columns = [
                ("swollen_extremeties","swollen_legs"),
                ("abdominal_pain","belly_pain"),
                ("increased_appetite","excessive_hunger"),
                ("visual_disturbances","blurred_and_distorted_vision"),
                ("palpitations","fast_heart_rate")
            ]

            # Merging and removing column with similar names
            for col1, col2 in similar_columns:
                df = self.merge_and_drop_col(df, col1, col2)
            x = df.drop(columns=[target])
            self.train_and_save_model(df)
            joblib.dump(list(x.columns), self.FEATURES_PATH)

        symptoms = joblib.load(self.FEATURES_PATH)
        missing_symptoms = [s for s in symptoms if s not in x_test.columns]
        if missing_symptoms:
            missing_df = pd.DataFrame(0, index=x_test.index, columns=missing_symptoms)
            x_test = pd.concat([x_test, missing_df], axis=1)
            x_test = x_test[list(symptoms)]

        return x_test
