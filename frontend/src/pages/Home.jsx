import { useEffect, useState } from "react";
import { getStats } from "../services/api";
import { COMMON_DISEASES } from "../constants";
import SymptomChartJS from "../components/SymptomChartJS";
import { COMMON_SYMPTOMS, dashboardItems } from "../constants";
import { DiseaseCard, Bullet } from "../utils";

export default function Home() {
    const [stats, setStats] = useState({ correct: 0, incorrect: 0, notReviewed: 0 });
    useEffect(() => {
        async function fetchStats() {
            const data = await getStats();
            setStats(data);
        }
        fetchStats();

        // auto refresh every 10 sec
        const interval = setInterval(fetchStats, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-8">
            {/* Enhanced Header / Note Section with Warning Icon */}
            <div className="bg-gradient-to-r from-amber-100 to-amber-200 dark:from-amber-600 dark:to-amber-700 px-6 py-4 rounded-xl shadow-lg border-l-4 border-amber-500 dark:border-amber-800">
                <div className="flex items-start">
                    <div className="bg-amber-500 dark:bg-amber-800 p-2 rounded-full mr-4 flex-shrink-0">
                        <i className="fas fa-exclamation-triangle text-lg text-white"></i>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-[#666] dark:text-white">Important Notice</h2>
                        <p className="text-amber-700 dark:text-amber-50 mt-2">
                            This medical dashboard displays analyzed symptom and disease data from our dataset.
                            The information shown is for educational and research purposes only and should not
                            be used for diagnostic purposes. Always consult a healthcare professional for
                            medical advice.
                        </p>
                        <div className="mt-3 text-sm text-amber-800 dark:text-amber-100 flex items-center">
                            <i className="fas fa-database mr-1.5"></i>
                            <span>Data last updated: {new Date().toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <section>
                <Bullet title={dashboardItems.predictionStats.title} icon={dashboardItems.predictionStats.icon}/>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="p-6 rounded-xl shadow bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/70 dark:to-green-800/70 border border-green-200 dark:border-green-700">
                        <div className="flex items-center mb-3">
                            <div className="bg-green-600 p-2 rounded-lg mr-3">
                                <i className="fas fa-check text-white"></i>
                            </div>
                            <h4 className="text-lg font-semibold text-green-800 dark:text-green-200">Correct</h4>
                        </div>
                        <p className="text-3xl font-bold text-green-700 dark:text-green-300">{stats.correct}</p>
                    </div>

                    <div className="p-6 rounded-xl shadow bg-gradient-to-br from-red-100 to-red-50 dark:from-red-900/70 dark:to-red-800/70 border border-red-200 dark:border-red-700">
                        <div className="flex items-center mb-3">
                            <div className="bg-red-600 p-2 rounded-lg mr-3">
                                <i className="fas fa-times text-white"></i>
                            </div>
                            <h4 className="text-lg font-semibold text-red-800 dark:text-red-200">Incorrect</h4>
                        </div>
                        <p className="text-3xl font-bold text-red-700 dark:text-red-300">{stats.incorrect}</p>
                    </div>

                    <div className="p-6 rounded-xl shadow bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/70 dark:to-amber-800/70 border border-amber-200 dark:border-amber-700">
                        <div className="flex items-center mb-3">
                            <div className="bg-amber-600 p-2 rounded-lg mr-3">
                                <i className="fas fa-question text-white"></i>
                            </div>
                            <h4 className="text-lg font-semibold text-amber-800 dark:text-amber-200">Not Reviewed</h4>
                        </div>
                        <p className="text-3xl font-bold text-amber-700 dark:text-amber-300">{stats.notReviewed}</p>
                    </div>
                </div>
            </section>

            {/* Common Symptoms */}
            <section>
                
                <Bullet title={dashboardItems.commonSymptoms.title} icon={dashboardItems.commonSymptoms.icon}/>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                    <div className="p-6">
                        <SymptomChartJS />

                        <div className="mt-6">
                            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                                <i className="fas fa-star text-amber-500 mr-2"></i>
                                Top 5 Common Symptoms
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {COMMON_SYMPTOMS.slice(0, 5).map((s, i) => (
                                    <div key={i} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg flex items-center border border-gray-100 dark:border-gray-600">
                                        <div className="bg-blue-100 dark:bg-blue-900 h-10 w-10 rounded-full flex items-center justify-center mr-4">
                                            <span className="text-blue-600 dark:text-blue-300 font-bold">{i + 1}</span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800 dark:text-gray-200">{s.name}</p>
                                            {s.common !== s.name && (
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{s.common}</p>
                                            )}
                                            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">{s.count} cases</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Common Diseases Section */}
            <section className="mb-12">
                <Bullet title={dashboardItems.commonDiseases.title} icon={dashboardItems.commonDiseases.icon}/>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {COMMON_DISEASES.map((disease, i) => (
                        <DiseaseCard key={i} disease={disease} />
                    ))}
                </div>
            </section>
        </div>
    );
}