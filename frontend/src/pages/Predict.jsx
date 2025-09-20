import PredictForm from "../components/PredictForm";

export default function Predict() {
    return (
        <div className="space-y-6">
            {/* Prediction Form */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                <PredictForm />
            </div>
        </div>
    );
}
