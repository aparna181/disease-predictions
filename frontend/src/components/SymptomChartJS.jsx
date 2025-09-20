import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
    Title,
} from "chart.js";
import { COMMON_SYMPTOMS } from "../constants";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);

export default function SymptomChartJS() {
    const data = {
        labels: COMMON_SYMPTOMS.map((s) => `${s.name}`),
        datasets: [
            {
                label: "Occurrences",
                data: COMMON_SYMPTOMS.map((s) => s.count),
                backgroundColor: "rgba(99, 102, 241, 0.7)",
                borderRadius: 6,
            },
        ],
    };


    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            title: {
                display: true,
                text: "Common Symptoms",
                color: "#374151",
                font: { size: 16, weight: "bold" },
            },
        },
        scales: {
            x: {
                ticks: { color: "#6b7280" },
            },
            y: {
                ticks: { color: "#6b7280" },
            },
        },
    };

    return (
        <div className="w-full h-80">
            <Bar data={data} options={options} />
        </div>
    );
}
