import { useEffect, useState } from "react";
import { fetchLogs } from "../services/api";
import { motion, AnimatePresence } from "framer-motion";

export default function Logs() {
    const [logs, setLogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedLog, setSelectedLog] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetchLogs()
            .then((data) => setLogs(data))
            .finally(() => setIsLoading(false));
    }, []);

    const formatTimestamp = (ts) => {
        if (!ts) return "-";
        const date = new Date(ts);
        return date.toLocaleString();
    };

    // Get active symptoms for a log
    const getActiveSymptoms = (features) => {
        if (!features) return [];
        return Object.entries(features)
            .filter(([_, value]) => value === 1)
            .map(([key]) => key);
    };

    const downloadCSV = () => {
        if (!logs.length) return;

        const headers = ["id", "active_symptoms_count", "predicted", "status", "timestamp", "active_symptoms"];
        const csvRows = [
            headers.join(","),
            ...logs.map((row) =>
                [
                    row.id,
                    getActiveSymptoms(row.features).length,
                    `"${row.predicted}"`,
                    row.status,
                    formatTimestamp(row.timestamp),
                    `"${getActiveSymptoms(row.features).join("; ")}"`
                ].join(",")
            )
        ];

        const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "predictions.csv";
        a.click();
    };

    const openModal = (log) => {
        setSelectedLog(log);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedLog(null);
    };

    return (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            {/* Header */}
            <div className="flex flex-col justify-between items-start mb-6">
                <div className="mb-4">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                        Prediction Logs
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        History of all disease predictions
                    </p>
                </div>
                <button
                    onClick={downloadCSV}
                    disabled={logs.length === 0}
                    className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    <i className="fas fa-download mr-2"></i>
                    Export CSV
                </button>
            </div>

            {/* Mobile Cards View */}
            {isLoading ? (
                <div className="flex justify-center items-center p-8">
                    <i className="fas fa-spinner fa-spin text-2xl text-blue-500"></i>
                    <span className="ml-3 text-gray-600 dark:text-gray-400">Loading logs...</span>
                </div>
            ) : logs.length === 0 ? (
                <div className="text-center p-8 text-gray-500 dark:text-gray-400">
                    <i className="fas fa-inbox text-4xl mb-3"></i>
                    <p>No prediction logs found</p>
                </div>
            ) : (
                <>
                    {/* Mobile Cards */}
                    <div className="sm:hidden space-y-4">
                        {logs.map((log, index) => {
                            const activeSymptoms = getActiveSymptoms(log.features);
                            return (
                                <div 
                                    key={index+1}
                                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 shadow-sm"
                                    onClick={() => openModal(log)}
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <span className="font-medium text-gray-800 dark:text-gray-200">
                                            #{index+1}
                                        </span>
                                        <span
                                            className={`px-2 py-1 rounded-full text-white text-xs font-medium ${log.status === "reviewed"
                                                    ? "bg-green-500"
                                                    : log.status === "correct"
                                                    ? "bg-emerald-500"
                                                    : log.status === "incorrect"
                                                    ? "bg-red-500"
                                                    : "bg-amber-500"
                                                }`}
                                        >
                                            {log.status}
                                        </span>
                                    </div>
                                    
                                    <div className="mb-3">
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Predicted Disease</p>
                                        <p className="font-semibold text-gray-800 dark:text-gray-200 text-lg">
                                            {log.predicted}
                                        </p>
                                    </div>

                                    <div className="mb-3">
                                        <div className="flex justify-between items-center mb-2">
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Symptoms</p>
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300">
                                                {activeSymptoms.length} symptoms
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                            {activeSymptoms.slice(0, 2).map((symptom, index) => (
                                                <span 
                                                    key={index}
                                                    className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300"
                                                >
                                                    {symptom}
                                                </span>
                                            ))}
                                            {activeSymptoms.length > 2 && (
                                                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                                                    +{activeSymptoms.length - 2} more
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-600">
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            {formatTimestamp(log.timestamp)}
                                        </span>
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openModal(log);
                                            }}
                                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-xs font-medium flex items-center"
                                        >
                                            <i className="fas fa-eye mr-1"></i>
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Desktop Table */}
                    <div className="hidden sm:block w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                        <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600">
                                        Sr. No.
                                    </th>
                                    <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600">
                                        Symptoms
                                    </th>
                                    <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600">
                                        Predicted Disease
                                    </th>
                                    <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600">
                                        Status
                                    </th>
                                    <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600">
                                        Timestamp
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.map((log, index) => {
                                    const activeSymptoms = getActiveSymptoms(log.features);
                                    return (
                                        <tr 
                                            key={index+1} 
                                            className="hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600 cursor-pointer"
                                            onClick={() => openModal(log)}
                                        >
                                            <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">
                                                {index+1}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex flex-col space-y-2">
                                                    <div className="flex items-center">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 mr-2">
                                                            {activeSymptoms.length} symptoms
                                                        </span>
                                                        <button 
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                openModal(log);
                                                            }}
                                                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-xs font-medium flex items-center"
                                                        >
                                                            <i className="fas fa-eye mr-1"></i>
                                                            View all
                                                        </button>
                                                    </div>
                                                    <div className="flex flex-wrap gap-1">
                                                        {activeSymptoms.slice(0, 3).map((symptom, index) => (
                                                            <span 
                                                                key={index}
                                                                className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300"
                                                            >
                                                                {symptom}
                                                            </span>
                                                        ))}
                                                        {activeSymptoms.length > 3 && (
                                                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                                                                +{activeSymptoms.length - 3} more
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">
                                                {log.predicted}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-white text-xs font-medium ${log.status === "reviewed"
                                                            ? "bg-green-500"
                                                            : log.status === "correct"
                                                            ? "bg-emerald-500"
                                                            : log.status === "incorrect"
                                                            ? "bg-red-500"
                                                            : "bg-amber-500"
                                                        }`}
                                                >
                                                    {log.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                                {formatTimestamp(log.timestamp)}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {/* Pagination/Info */}
            {logs.length > 0 && (
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <span>Showing {logs.length} records</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        {window.innerWidth < 640 ? "Tap on any card to view details" : "Click on any row to view details"}
                    </span>
                </div>
            )}

            {/* Symptoms Modal - Mobile Optimized */}
            <AnimatePresence>
                {isModalOpen && selectedLog && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-full sm:max-w-2xl max-h-[90vh] sm:max-h-[80vh] overflow-hidden mx-2"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold">
                                        Prediction Details
                                    </h3>
                                    <button
                                        onClick={closeModal}
                                        className="text-white hover:text-gray-200 transition-colors p-1"
                                    >
                                        <i className="fas fa-times text-xl"></i>
                                    </button>
                                </div>
                            </div>

                            {/* Modal Body */}
                            <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-120px)] sm:max-h-[60vh]">
                                {/* Prediction Info */}
                                <div className="grid grid-cols-1 gap-4 mb-6">
                                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center">
                                            <i className="fas fa-diagnoses mr-2 text-blue-500"></i>
                                            Predicted Disease
                                        </h4>
                                        <p className="text-lg font-bold text-gray-900 dark:text-white break-words">
                                            {selectedLog.predicted}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center">
                                            <i className="fas fa-info-circle mr-2 text-blue-500"></i>
                                            Status
                                        </h4>
                                        <span
                                            className={`px-3 py-1 rounded-full text-white text-sm font-medium ${selectedLog.status === "reviewed"
                                                    ? "bg-green-500"
                                                    : selectedLog.status === "correct"
                                                    ? "bg-emerald-500"
                                                    : selectedLog.status === "incorrect"
                                                    ? "bg-red-500"
                                                    : "bg-amber-500"
                                                }`}
                                        >
                                            {selectedLog.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Symptoms Section */}
                                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                                        <i className="fas fa-list-ul mr-2 text-green-500"></i>
                                        Selected Symptoms ({getActiveSymptoms(selectedLog.features).length})
                                    </h4>
                                    <div className="grid grid-cols-1 gap-2">
                                        {getActiveSymptoms(selectedLog.features).map((symptom, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center px-3 py-2 bg-white dark:bg-gray-600 rounded-md border border-gray-200 dark:border-gray-500"
                                            >
                                                <i className="fas fa-check-circle text-green-500 mr-2 text-sm"></i>
                                                <span className="text-sm text-gray-700 dark:text-gray-300 break-words">
                                                    {symptom}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Timestamp */}
                                <div className="mt-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                                    <i className="fas fa-clock mr-1"></i>
                                    {formatTimestamp(selectedLog.timestamp)}
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="px-4 sm:px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 flex justify-end">
                                <button
                                    onClick={closeModal}
                                    className="w-full sm:w-auto px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors text-sm sm:text-base"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}