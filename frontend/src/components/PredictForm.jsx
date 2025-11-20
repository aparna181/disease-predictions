import { useState } from "react";
import { predictDisease, updateStatus } from "../services/api";
import { FEATURE_GROUPS, SYMPTOMS_ORDER } from "../constants";
import { motion, AnimatePresence } from "framer-motion";

export default function PredictForm() {
    const [features, setFeatures] = useState({});
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
    const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null);
    const [search, setSearch] = useState("");
    const [activeGroup, setActiveGroup] = useState(FEATURE_GROUPS[0].name);

    // Get all symptom IDs for counting and searching
    const allSymptomIds = FEATURE_GROUPS.flatMap(group =>
        group.items.map(item => item.id)
    );

    // Toggle symptom
    const handleToggle = (symptomId) => {
        setFeatures((prev) => ({
            ...prev,
            [symptomId]: prev[symptomId] === 1 ? 0 : 1,
        }));
        setSearch(""); // clear after choosing
    };

    // Count selected
    const selectedCount = Object.values(features).filter((v) => v === 1).length;
    const totalCount = allSymptomIds.length;

    // Submit prediction
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedCount === 0) return;

        setIsLoading(true);
        setResult(null);
        setFeedbackSubmitted(false);
        setIsCorrect(null);

        try {
            const orderedFeatures = SYMPTOMS_ORDER.map(
                (symptom) => Number(features[symptom] || 0)
            );
            const selectedSymptoms = Object.entries(features)
                .filter(([_, value]) => value === 1)
                .reduce((acc, [key]) => {
                    acc[key] = Number(1);
                    return acc;
                }, {});
            const response = await predictDisease({ features: selectedSymptoms });
            setResult(response);
        } catch (error) {
            console.error("Prediction error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Submit feedback
    const handleFeedback = async (correct) => {
        setIsSubmittingFeedback(true);
        setIsCorrect(correct);

        try {
            await updateStatus({
                id: result.log_id,
                value: correct ? "correct" : "incorrect",
            });
            setFeedbackSubmitted(true);
        } catch (error) {
            console.error("Feedback submission error:", error);
        } finally {
            setIsSubmittingFeedback(false);
        }
    };

    // Reset form
    const handleReset = () => {
        setFeatures({});
        setResult(null);
        setFeedbackSubmitted(false);
        setIsCorrect(null);
        setSearch("");
        setActiveGroup(FEATURE_GROUPS[0].name);
    };

    // Get symptom display name
    const getSymptomDisplayName = (symptomId) => {
        for (const group of FEATURE_GROUPS) {
            const symptom = group.items.find(item => item.id === symptomId);
            if (symptom) {
                return symptom.commonName;
            }
        }
        return symptomId; // fallback to ID if not found
    };

    // Get symptom by ID
    const getSymptomById = (symptomId) => {
        for (const group of FEATURE_GROUPS) {
            const symptom = group.items.find(item => item.id === symptomId);
            if (symptom) return symptom;
        }
        return null;
    };

    // Suggestions for search bar - search both ID and common name
    const filteredSuggestions = search
        ? allSymptomIds
            .filter(symptomId => {
                const symptom = getSymptomById(symptomId);
                return symptom && (
                    symptom.id.toLowerCase().includes(search.toLowerCase()) ||
                    symptom.commonName.toLowerCase().includes(search.toLowerCase())
                );
            })
            .slice(0, 8) // show top 8
        : [];

    return (
        <form onSubmit={handleSubmit} className="space-y-8 relative">
            {/* Header */}
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                    Disease Prediction
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                    Select symptoms to predict possible diseases
                </p>
            </div>

            {/* Progress Card and Search Bar in One Line */}
            <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                {/* Progress Card */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border border-gray-200 dark:border-gray-700 flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                            Selected Symptoms
                        </h3>
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                            {selectedCount} / {totalCount}
                        </span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-full">
                        <motion.div
                            className="h-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                            initial={{ width: 0 }}
                            animate={{
                                width: `${(selectedCount / totalCount) * 100}%`,
                            }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>

                {/* Search Bar with Suggestions */}
                {!result && (
                    <div className="relative flex-1 min-w-0">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search symptoms..."
                            className="w-full h-full px-4 py-3 border rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500"
                        />

                        {/* Suggestions Dropdown */}
                        {filteredSuggestions.length > 0 && (
                            <ul className="absolute z-20 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mt-1 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                {filteredSuggestions.map((symptomId, index) => {
                                    const symptom = getSymptomById(symptomId);
                                    return (
                                        <li
                                            key={index}
                                            onClick={() => handleToggle(symptomId)}
                                            className={`px-4 py-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-700 ${features[symptomId] === 1
                                                    ? "bg-blue-500 text-white"
                                                    : "text-gray-800 dark:text-gray-200"
                                                }`}
                                        >
                                            <div>
                                                <div className="font-medium">{symptom.commonName}</div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                )}
            </div>

            {/* Navigation Tabs */}
            {!result && (
                <div className="flex flex-wrap gap-2">
                    {FEATURE_GROUPS.map((group) => (
                        <button
                            key={group.name}
                            type="button"
                            onClick={() => setActiveGroup(group.name)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition 
                                ${activeGroup === group.name
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 dark:bg-gray-700 dark:text-gray-300 text-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600"
                                }`}
                        >
                            {group.icon} {group.name}
                        </button>
                    ))}
                </div>
            )}

            {/* Symptom Groups - Filtered */}
            <AnimatePresence>
                {!result && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-5 overflow-hidden"
                    >
                        <div className="pr-2">
                            {FEATURE_GROUPS.filter(
                                (g) => g.name === activeGroup
                            ).map((group) => (
                                <div
                                    key={group.name}
                                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden"
                                >
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 p-3">
                                        {group.items
                                            .filter((symptom) =>
                                                symptom.id.toLowerCase().includes(search.toLowerCase()) ||
                                                symptom.commonName.toLowerCase().includes(search.toLowerCase())
                                            )
                                            .map((symptom, i) => (
                                                <motion.button
                                                    key={i}
                                                    type="button"
                                                    onClick={() =>
                                                        handleToggle(symptom.id)
                                                    }
                                                    whileHover={{ scale: 1.03 }}
                                                    whileTap={{ scale: 0.97 }}
                                                    className={`py-3 rounded-xl text-sm font-medium transition-all flex flex-col items-center justify-center text-center
                                                        ${features[symptom.id] === 1
                                                            ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                                                            : "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
                                                        }`}
                                                >
                                                    {features[symptom.id] === 1 && (
                                                        <i className="fas fa-check-circle mb-1"></i>
                                                    )}
                                                    <div className="font-medium">{symptom.commonName}</div>
                                                </motion.button>
                                            ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Submit Button */}
            <AnimatePresence>
                {!result && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex justify-center pt-4"
                    >
                        <motion.button
                            type="submit"
                            disabled={selectedCount === 0 || isLoading}
                            whileHover={{ scale: selectedCount > 0 ? 1.05 : 1 }}
                            whileTap={{ scale: selectedCount > 0 ? 0.95 : 1 }}
                            className={`px-8 py-4 text-lg font-bold rounded-xl shadow-lg transition flex items-center
                                ${selectedCount > 0 && !isLoading
                                    ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:shadow-xl"
                                    : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                                }`}
                        >
                            {isLoading ? (
                                <>
                                    <i className="fas fa-spinner fa-spin mr-2"></i>
                                    Analyzing...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-search-medical mr-2"></i>
                                    Predict Disease
                                </>
                            )}
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Prediction Result + Feedback */}
            <AnimatePresence>
                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        className="space-y-6"
                    >
                        {/* Result Card */}
                        <div className="p-6 rounded-xl shadow-lg bg-gradient-to-r from-green-500 to-emerald-600 text-center">
                            <div className="bg-white/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-diagnoses text-white text-2xl"></i>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">
                                Prediction Result
                            </h3>
                            <p className="text-white text-lg font-semibold">
                                {result.predicted_class}
                            </p>
                            <p className="text-green-100 mt-2">
                                Based on {selectedCount} selected symptoms
                            </p>
                        </div>

                        {/* Selected Symptoms List */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                                Selected Symptoms ({selectedCount})
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {Object.entries(features)
                                    .filter(([_, value]) => value === 1)
                                    .map(([symptomId]) => (
                                        <span
                                            key={symptomId}
                                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
                                        >
                                            {getSymptomDisplayName(symptomId)}
                                        </span>
                                    ))}
                            </div>
                        </div>

                        {/* Feedback Section */}
                        <AnimatePresence mode="wait">
                            {!feedbackSubmitted ? (
                                <motion.div
                                    key="feedback-buttons"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700"
                                >
                                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">
                                        Was this prediction correct?
                                    </h4>
                                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                                        <motion.button
                                            type="button"
                                            onClick={() => handleFeedback(true)}
                                            disabled={isSubmittingFeedback}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white rounded-lg font-medium flex items-center justify-center transition-colors"
                                        >
                                            {isSubmittingFeedback ? (
                                                <i className="fas fa-spinner fa-spin mr-2"></i>
                                            ) : (
                                                <i className="fas fa-check-circle mr-2"></i>
                                            )}
                                            Yes, Correct
                                        </motion.button>
                                        <motion.button
                                            type="button"
                                            onClick={() => handleFeedback(false)}
                                            disabled={isSubmittingFeedback}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-6 py-3 bg-red-500 hover:bg-red-600 disabled:bg-red-400 text-white rounded-lg font-medium flex items-center justify-center transition-colors"
                                        >
                                            {isSubmittingFeedback ? (
                                                <i className="fas fa-spinner fa-spin mr-2"></i>
                                            ) : (
                                                <i className="fas fa-times-circle mr-2"></i>
                                            )}
                                            No, Incorrect
                                        </motion.button>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="feedback-thanks"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 text-center"
                                >
                                    <div
                                        className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isCorrect
                                                ? "bg-green-100 dark:bg-green-900/30"
                                                : "bg-red-100 dark:bg-red-900/30"
                                            }`}
                                    >
                                        <i
                                            className={`text-2xl ${isCorrect
                                                    ? "fas fa-check-circle text-green-500"
                                                    : "fas fa-times-circle text-red-500"
                                                }`}
                                        ></i>
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                        {isCorrect
                                            ? "Thank you for your feedback!"
                                            : "Thanks for helping us improve!"}
                                    </h4>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                                        {isCorrect
                                            ? "Your feedback helps improve our prediction accuracy."
                                            : "We appreciate you taking the time to provide feedback."}
                                    </p>
                                    <motion.button
                                        type="button"
                                        onClick={handleReset}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg font-medium transition-all"
                                    >
                                        <i className="fas fa-redo mr-2"></i>
                                        Make Another Prediction
                                    </motion.button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>
        </form>
    );
}