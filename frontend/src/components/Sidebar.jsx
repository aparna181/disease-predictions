import { Link, useLocation } from "react-router-dom";
import { navItems } from "../constants";

export default function Sidebar() {
    const location = useLocation();

    return (
        <aside className="h-screen w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col fixed left-0 top-0 shadow-lg">
            {/* Header */}
            <div className="p-5 border-b border-gray-200 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center">
                    <i className="fas fa-heartbeat mr-2"></i>
                    Disease Predictor
                </h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center px-4 py-3 rounded-lg transition-all ${location.pathname === item.path
                            ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md"
                            : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800"
                            }`}
                    >
                        <i className={`${item.icon} w-5 mr-3 ${location.pathname === item.path ? "text-white" : "text-blue-500"}`}></i>
                        <span className="font-medium">{item.name}</span>
                        {location.pathname === item.path && (
                            <i className="fas fa-chevron-right ml-auto text-xs"></i>
                        )}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}