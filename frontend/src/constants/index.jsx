export const API_BASE = "https://disease-prediction-n9fx.onrender.com";
// export const API_BASE = "http://localhost:5000";

export const navItems = [
    {
        name: "Dashboard",
        path: "/",
        icon: "fas fa-home"
    },
    {
        name: "Predict Disease",
        path: "/predict",
        icon: "fas fa-diagnoses"
    },
    {
        name: "Logs",
        path: "/logs",
        icon: "fas fa-history"
    },
];

export const dashboardItems = {
    predictionStats: {
        title: "Prediction Stats",
        icon: "fas fa-chart-bar"
    },
    commonSymptoms: {
        title: "Common Symptoms",
        icon: "fas fa-stethoscope"
    },
    commonDiseases: {
        title: "Common Diseases with Symptoms",
        icon: "fas fa-virus"
    }
};

export const SYMPTOMS_ORDER = [
    "itching", "skin_rash", "nodal_skin_eruptions", "continuous_sneezing", "shivering", "chills",
    "joint_pain", "stomach_pain", "acidity", "ulcers_on_tongue", "muscle_wasting", "vomiting",
    "burning_micturition", "spotting_urination", "fatigue", "weight_gain", "anxiety", "cold_hands_and_feets",
    "mood_swings", "weight_loss", "restlessness", "lethargy", "patches_in_throat", "irregular_sugar_level",
    "cough", "high_fever", "sunken_eyes", "breathlessness", "sweating", "dehydration", "indigestion",
    "headache", "yellowish_skin", "dark_urine", "nausea", "loss_of_appetite", "pain_behind_the_eyes",
    "back_pain", "constipation", "abdominal_pain", "diarrhoea", "mild_fever", "yellow_urine",
    "yellowing_of_eyes", "acute_liver_failure", "swelling_of_stomach", "swelled_lymph_nodes", "malaise",
    "phlegm", "throat_irritation", "redness_of_eyes", "sinus_pressure", "runny_nose", "congestion",
    "chest_pain", "weakness_in_limbs", "pain_during_bowel_movements", "pain_in_anal_region", "bloody_stool",
    "irritation_in_anus", "neck_pain", "dizziness", "cramps", "bruising", "obesity", "swollen_blood_vessels",
    "puffy_face_and_eyes", "enlarged_thyroid", "brittle_nails", "swollen_extremeties", "extra_marital_contacts",
    "drying_and_tingling_lips", "slurred_speech", "knee_pain", "hip_joint_pain", "muscle_weakness", "stiff_neck",
    "swelling_joints", "movement_stiffness", "spinning_movements", "loss_of_balance", "unsteadiness",
    "weakness_of_one_body_side", "loss_of_smell", "bladder_discomfort", "foul_smell_of urine", "continuous_feel_of_urine",
    "passage_of_gases", "internal_itching", "toxic_look_(typhos)", "depression", "irritability", "muscle_pain",
    "altered_sensorium", "red_spots_over_body", "abnormal_menstruation", "dischromic _patches", "watering_from_eyes",
    "increased_appetite", "polyuria", "family_history", "mucoid_sputum", "rusty_sputum", "lack_of_concentration",
    "visual_disturbances", "receiving_blood_transfusion", "receiving_unsterile_injections", "coma", "stomach_bleeding",
    "distention_of_abdomen", "history_of_alcohol_consumption", "blood_in_sputum", "prominent_veins_on_calf", "palpitations",
    "painful_walking", "pus_filled_pimples", "blackheads", "scurring", "skin_peeling", "silver_like_dusting",
    "small_dents_in_nails", "inflammatory_nails", "blister", "red_sore_around_nose", "yellow_crust_ooze",
];

export const FEATURE_GROUPS = [
    {
        name: "General Symptoms",
        icon: "🩺",
        items: [
            { id: "itching", commonName: "Itching" },
            { id: "shivering", commonName: "Shivering" },
            { id: "chills", commonName: "Chills" },
            { id: "fatigue", commonName: "Fatigue" },
            { id: "weight_gain", commonName: "Weight Gain" },
            { id: "weight_loss", commonName: "Weight Loss" },
            { id: "lethargy", commonName: "Lethargy" },
            { id: "high_fever", commonName: "High Fever" },
            { id: "mild_fever", commonName: "Mild Fever" },
            { id: "sweating", commonName: "Sweating" },
            { id: "dehydration", commonName: "Dehydration" },
            { id: "sunken_eyes", commonName: "Sunken Eyes" },
            { id: "weakness_in_limbs", commonName: "Limb Weakness" },
            { id: "malaise", commonName: "General Malaise" },
            { id: "obesity", commonName: "Obesity" },
            { id: "toxic_look_(typhos)", commonName: "Toxic Look" },
            { id: "dizziness", commonName: "Dizziness" },
            { id: "loss_of_balance", commonName: "Loss of Balance" },
            { id: "unsteadiness", commonName: "Unsteadiness" },
            { id: "weakness_of_one_body_side", commonName: "One-sided Weakness" },
            { id: "coma", commonName: "Coma" }
        ]
    },
    {
        name: "Skin Related",
        icon: "🌿",
        items: [
            { id: "skin_rash", commonName: "Skin Rash" },
            { id: "nodal_skin_eruptions", commonName: "Skin Eruptions" },
            { id: "ulcers_on_tongue", commonName: "Tongue Ulcers" },
            { id: "yellowish_skin", commonName: "Yellowish Skin" },
            { id: "yellowing_of_eyes", commonName: "Yellow Eyes" },
            { id: "swelled_lymph_nodes", commonName: "Swollen Lymph Nodes" },
            { id: "puffy_face_and_eyes", commonName: "Puffy Face & Eyes" },
            { id: "drying_and_tingling_lips", commonName: "Dry Tingling Lips" },
            { id: "bruising", commonName: "Bruising" },
            { id: "swollen_blood_vessels", commonName: "Swollen Blood Vessels" },
            { id: "brittle_nails", commonName: "Brittle Nails" },
            { id: "red_spots_over_body", commonName: "Red Spots on Body" },
            { id: "dischromic_patches", commonName: "Discolored Patches" },
            { id: "pus_filled_pimples", commonName: "Pus-filled Pimples" },
            { id: "blackheads", commonName: "Blackheads" },
            { id: "scurring", commonName: "Scarring" },
            { id: "skin_peeling", commonName: "Skin Peeling" },
            { id: "silver_like_dusting", commonName: "Silver-like Dusting" },
            { id: "small_dents_in_nails", commonName: "Nail Dents" },
            { id: "inflammatory_nails", commonName: "Inflamed Nails" },
            { id: "blister", commonName: "Blisters" },
            { id: "red_sore_around_nose", commonName: "Red Sores Around Nose" },
            { id: "yellow_crust_ooze", commonName: "Yellow Crust" }
        ]
    },
    {
        name: "Pain Related",
        icon: "💢",
        items: [
            { id: "joint_pain", commonName: "Joint Pain" },
            { id: "stomach_pain", commonName: "Stomach Pain" },
            { id: "muscle_pain", commonName: "Muscle Pain" },
            { id: "headache", commonName: "Headache" },
            { id: "pain_behind_the_eyes", commonName: "Pain Behind Eyes" },
            { id: "back_pain", commonName: "Back Pain" },
            { id: "abdominal_pain", commonName: "Abdominal Pain" },
            { id: "neck_pain", commonName: "Neck Pain" },
            { id: "knee_pain", commonName: "Knee Pain" },
            { id: "hip_joint_pain", commonName: "Hip Pain" },
            { id: "cramps", commonName: "Muscle Cramps" },
            { id: "chest_pain", commonName: "Chest Pain" },
            { id: "pain_during_bowel_movements", commonName: "Painful Bowel Movements" },
            { id: "pain_in_anal_region", commonName: "Anal Pain" },
            { id: "painful_walking", commonName: "Painful Walking" }
        ]
    },
    {
        name: "Digestive Issues",
        icon: "🍽️",
        items: [
            { id: "acidity", commonName: "Acidity" },
            { id: "vomiting", commonName: "Vomiting" },
            { id: "loss_of_appetite", commonName: "Loss of Appetite" },
            { id: "indigestion", commonName: "Indigestion" },
            { id: "constipation", commonName: "Constipation" },
            { id: "diarrhoea", commonName: "Diarrhea" },
            { id: "muscle_wasting", commonName: "Muscle Wasting" },
            { id: "irregular_sugar_level", commonName: "Irregular Sugar Levels" },
            { id: "acute_liver_failure", commonName: "Liver Failure" },
            { id: "swelling_of_stomach", commonName: "Stomach Swelling" },
            { id: "distention_of_abdomen", commonName: "Abdominal Distention" },
            { id: "stomach_bleeding", commonName: "Stomach Bleeding" },
            { id: "bloody_stool", commonName: "Bloody Stool" },
            { id: "irritation_in_anus", commonName: "Anal Irritation" },
            { id: "passage_of_gases", commonName: "Gas" },
            { id: "internal_itching", commonName: "Internal Itching" },
            { id: "history_of_alcohol_consumption", commonName: "Alcohol History" }
        ]
    },
    {
        name: "Urinary Issues",
        icon: "💧",
        items: [
            { id: "burning_micturition", commonName: "Burning Urination" },
            { id: "spotting_urination", commonName: "Spotting Urination" },
            { id: "dark_urine", commonName: "Dark Urine" },
            { id: "yellow_urine", commonName: "Yellow Urine" },
            { id: "bladder_discomfort", commonName: "Bladder Discomfort" },
            { id: "foul_smell_of_urine", commonName: "Foul Smelling Urine" },
            { id: "continuous_feel_of_urine", commonName: "Constant Urge to Urinate" },
            { id: "polyuria", commonName: "Frequent Urination" }
        ]
    },
    {
        name: "Respiratory Issues",
        icon: "🫁",
        items: [
            { id: "continuous_sneezing", commonName: "Continuous Sneezing" },
            { id: "cough", commonName: "Cough" },
            { id: "breathlessness", commonName: "Breathlessness" },
            { id: "phlegm", commonName: "Phlegm" },
            { id: "throat_irritation", commonName: "Throat Irritation" },
            { id: "patches_in_throat", commonName: "Throat Patches" },
            { id: "sinus_pressure", commonName: "Sinus Pressure" },
            { id: "runny_nose", commonName: "Runny Nose" },
            { id: "congestion", commonName: "Congestion" },
            { id: "loss_of_smell", commonName: "Loss of Smell" },
            { id: "mucoid_sputum", commonName: "Mucoid Sputum" },
            { id: "rusty_sputum", commonName: "Rusty Sputum" },
            { id: "blood_in_sputum", commonName: "Blood in Sputum" }
        ]
    },
    {
        name: "Mental & Neurological",
        icon: "🧠",
        items: [
            { id: "anxiety", commonName: "Anxiety" },
            { id: "mood_swings", commonName: "Mood Swings" },
            { id: "restlessness", commonName: "Restlessness" },
            { id: "depression", commonName: "Depression" },
            { id: "irritability", commonName: "Irritability" },
            { id: "altered_sensorium", commonName: "Altered Consciousness" },
            { id: "lack_of_concentration", commonName: "Poor Concentration" },
            { id: "visual_disturbances", commonName: "Vision Problems" },
            { id: "slurred_speech", commonName: "Slurred Speech" },
            { id: "stiff_neck", commonName: "Stiff Neck" },
            { id: "movement_stiffness", commonName: "Movement Stiffness" },
            { id: "spinning_movements", commonName: "Spinning Sensation" }
        ]
    },
    {
        name: "Circulatory & Swelling",
        icon: "❤️",
        items: [
            { id: "cold_hands_and_feets", commonName: "Cold Hands & Feet" },
            { id: "swollen_extremeties", commonName: "Swollen Extremities" },
            { id: "enlarged_thyroid", commonName: "Enlarged Thyroid" },
            { id: "swelling_joints", commonName: "Swollen Joints" },
            { id: "prominent_veins_on_calf", commonName: "Prominent Calf Veins" },
            { id: "palpitations", commonName: "Heart Palpitations" },
            { id: "receiving_blood_transfusion", commonName: "Recent Blood Transfusion" },
            { id: "receiving_unsterile_injections", commonName: "Unsterile Injections" }
        ]
    },
    {
        name: "Reproductive & Hormonal",
        icon: "⚤",
        items: [
            { id: "abnormal_menstruation", commonName: "Abnormal Menstruation" },
            { id: "extra_marital_contacts", commonName: "Multiple Partners" },
            { id: "family_history", commonName: "Family History" },
            { id: "watering_from_eyes", commonName: "Watery Eyes" },
            { id: "increased_appetite", commonName: "Increased Appetite" },
            { id: "redness_of_eyes", commonName: "Red Eyes" },
            { id: "muscle_weakness", commonName: "Muscle Weakness" },
            { id: "nausea", commonName: "Nausea" }
        ]
    }
];

export const COMMON_DISEASES = [
    {
        name: "Diabetes",
        symptoms: ["Increased thirst", "Frequent urination", "Fatigue"],
    },
    {
        name: "Hypertension",
        symptoms: ["Headache", "Chest pain", "Blurred vision"],
    },
    {
        name: "Asthma",
        symptoms: ["Coughing", "Shortness of breath", "Wheezing"],
    },
    {
        name: "Common Cold",
        symptoms: ["Sneezing", "Runny nose", "Sore throat"],
    },
    {
        name: "Migraine",
        symptoms: ["Headache", "Sensitivity to light", "Nausea"],
    },
];

export const COMMON_SYMPTOMS = [
    { name: "Fatigue", common: "Tiredness / Weakness", count: 134 },
    { name: "Vomiting", common: "Vomiting", count: 117 },
    { name: "High Fever", common: "102+", count: 89 },
    { name: "Loss of Appetite", common: "No Hunger", count: 81 },
    { name: "Nausea", common: "Feeling like Vomiting", count: 77 },
    { name: "Headache", common: "Headache", count: 74 },
    { name: "Abdominal Pain", common: "Stomach Pain", count: 70 },
    { name: "Yellowish Skin", common: "Yellow Skin", count: 61 },
    { name: "Yellowing of Eyes", common: "Yellow Eyes", count: 58 },
    { name: "Chills", common: "Shivering", count: 53 },
    { name: "Malaise", common: "Feeling Unwell", count: 53 },
    { name: "Joint Pain", common: "Joint Pain", count: 46 },
    { name: "Sweating", common: "Excessive Sweating", count: 43 },
    { name: "Skin Rash", common: "Skin Rash", count: 42 },
    { name: "Chest Pain", common: "Chest Pain", count: 42 },
    { name: "Dark Urine", common: "Dark Urine", count: 41 },
    { name: "Itching", common: "Itchy Skin", count: 41 },
    { name: "Cough", common: "Cough", count: 36 },
    { name: "Diarrhoea", common: "Loose Motions", count: 35 },
    { name: "Muscle Pain", common: "Muscle Pain", count: 35 },
];
