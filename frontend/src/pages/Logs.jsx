import { useEffect, useState } from "react";
import { fetchLogs } from "../services/api";

export default function Logs() {
    const [logs, setLogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetchLogs()
            .then((data) => setLogs(data.logs))
            .finally(() => setIsLoading(false));
    }, []);

    const formatTimestamp = (ts) => {
        if (!ts) return "-";
        const date = new Date(ts);
        return date.toLocaleString();
    };

    // Get all unique feature keys across all logs
    const getFeatureColumns = () => {
        const featureSet = new Set();
        logs.forEach((log) => {
            if (log.features) {
                Object.keys(log.features).forEach((key) => featureSet.add(key));
            }
        });
        return Array.from(featureSet);
    };

    const featureColumns = getFeatureColumns();

    const downloadCSV = () => {
        if (!logs.length) return;

        const headers = ["id", ...featureColumns, "predicted", "status", "timestamp"];
        const csvRows = [
            headers.join(","),
            ...logs.map((row) =>
                [
                    row.id,
                    ...featureColumns.map((col) => row.features?.[col] ?? 0),
                    row.predicted,
                    row.status,
                    formatTimestamp(row.timestamp)
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

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                        Prediction Logs
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        History of all disease predictions
                    </p>
                </div>
                <button
                    onClick={downloadCSV}
                    disabled={logs.length === 0}
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center mt-4 sm:mt-0"
                >
                    <i className="fas fa-download mr-2"></i>
                    Export CSV
                </button>
            </div>

            {/* Table Container */}
            <div className="w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
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
                    <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600">
                                    ID
                                </th>
                                {featureColumns.map((col) => (
                                    <th key={col} className="px-3 py-3 font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600 whitespace-nowrap text-center">
                                        {col}
                                    </th>
                                ))}
                                <th className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600">
                                    Predicted
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
                            {logs.map((log) => (
                                <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600">
                                    <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">
                                        {log.id}
                                    </td>
                                    {featureColumns.map((col) => (
                                        <td key={col} className="px-3 py-3 text-center">
                                            <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs ${log.features?.[col] ? "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300" : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"}`}>
                                                {log.features?.[col] ?? 0}
                                            </span>
                                        </td>
                                    ))}
                                    <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">
                                        {log.predicted}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-white text-xs font-medium ${log.status === "reviewed"
                                                    ? "bg-green-500"
                                                    : "bg-amber-500"
                                                }`}
                                        >
                                            {log.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                                        {formatTimestamp(log.timestamp)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Pagination/Info */}
            {logs.length > 0 && (
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                    Showing {logs.length} records
                </div>
            )}
        </div>
    );
}