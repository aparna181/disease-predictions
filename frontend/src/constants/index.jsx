export const API_BASE = "https://disease-predictions-6itm.onrender.com";                     
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
    'ulcers_on_tongue', 'weight_gain', 'anxiety', 'cold_hands_and_feets',
    'irregular_sugar_level', 'pain_behind_the_eyes', 'back_pain',
    'mild_fever', 'yellow_urine', 'acute_liver_failure',
    'swelling_of_stomach', 'swelled_lymph_nodes', 'phlegm',
    'throat_irritation', 'fast_heart_rate', 'cramps', 'bruising',
    'swollen_legs', 'swollen_blood_vessels', 'puffy_face_and_eyes',
    'drying_and_tingling_lips', 'knee_pain', 'hip_joint_pain',
    'spinning_movements', 'unsteadiness', 'toxic_look_(typhos)',
    'depression', 'irritability', 'muscle_pain', 'red_spots_over_body',
    'mucoid_sputum', 'rusty_sputum', 'visual_disturbances',
    'distention_of_abdomen', 'fluid_overload', 'blood_in_sputum',
    'prominent_veins_on_calf', 'silver_like_dusting',
    'small_dents_in_nails', 'inflammatory_nails'
];

export const FEATURE_GROUPS = [
    {
        name: "General Symptoms",
        icon: "🩺",
        items: ["weight_gain", "mild_fever", "yellow_urine", "toxic_look_(typhos)"]
    },
    {
        name: "Skin Related",
        icon: "🌿",
        items: ["swelled_lymph_nodes", "puffy_face_and_eyes", "drying_and_tingling_lips", "red_spots_over_body", "silver_like_dusting", "small_dents_in_nails", "inflammatory_nails"]
    },
    {
        name: "Pain Related",
        icon: "💢",
        items: ["knee_pain", "hip_joint_pain", "cramps", "back_pain", "muscle_pain"]
    },
    {
        name: "Digestive Issues",
        icon: "🍽️",
        items: ["ulcers_on_tongue", "irregular_sugar_level", "acute_liver_failure", "swelling_of_stomach", "distention_of_abdomen", "fluid_overload"]
    },
    {
        name: "Circulatory Issues",
        icon: "💢",
        items: ["cold_hands_and_feets", "bruising", "swollen_legs", "swollen_blood_vessels", "prominent_veins_on_calf"]
    },
    {
        name: "Respiratory Issues",
        icon: "🩺",
        items: ["pain_behind_the_eyes", "phlegm", "throat_irritation", "fast_heart_rate", "mucoid_sputum", "rusty_sputum", "blood_in_sputum"]
    },
    {
        name: "Mental Issues",
        icon: "🌿",
        items: ["anxiety", "depression", "irritability", "spinning_movements", "unsteadiness", "visual_disturbances"]
    },
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
  