import { useState } from "react";

export const SymptomModal = ({ disease, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md mx-4 max-h-[80vh] overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4 text-white flex justify-between items-center">
                    <h3 className="text-xl font-bold">All Symptoms: {disease.name}</h3>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-gray-200 text-xl"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <div className="p-6 overflow-y-auto max-h-[60vh]">
                    <ul className="space-y-3">
                        {disease.symptoms.map((symptom, index) => (
                            <li
                                key={index}
                                className="flex items-start p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
                            >
                                <span className="bg-blue-600 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs mr-3 flex-shrink-0">
                                    {index + 1}
                                </span>
                                <span className="text-gray-700 dark:text-gray-300">{symptom}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export const DiseaseCard = ({ disease }) => {
    const [showAllSymptoms, setShowAllSymptoms] = useState(false);

    return (
        <>
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-blue-500 dark:border-blue-400">
                <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-lg text-gray-800 dark:text-gray-200">{disease.name}</h4>
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                        {disease.symptoms.length} symptoms
                    </span>
                </div>

                <ul className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                    {disease.symptoms.slice(0, 4).map((s, j) => (
                        <li key={j} className="mb-2 flex items-center">
                            <i className="fas fa-arrow-right text-blue-500 text-xs mr-2"></i>
                            <span>{s}</span>
                        </li>
                    ))}
                    {disease.symptoms.length > 4 && (
                        <li className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                            <button
                                onClick={() => setShowAllSymptoms(true)}
                                className="hover:underline flex items-center"
                            >
                                <i className="fas fa-plus-circle mr-1"></i>
                                View all {disease.symptoms.length} symptoms
                            </button>
                        </li>
                    )}
                </ul>
            </div>

            {showAllSymptoms && (
                <SymptomModal
                    disease={disease}
                    onClose={() => setShowAllSymptoms(false)}
                />
            )}
        </>
    );
}

export const Bullet = ({title, icon}) => {
    return (
        <div className="flex items-center mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-3 py-3 rounded-4xl mr-4">
                <i className={`${icon} text-white text-xl`}></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                {title}
            </h3>
        </div>
    );
}