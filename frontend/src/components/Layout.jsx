import { useState } from "react";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function Layout({ children }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            {/* Sidebar */}
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

            {/* Main content */}
            <div className="flex-1 flex flex-col md:ml-64">
                {/* Mobile top bar */}
                <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="text-gray-700 dark:text-gray-200 focus:outline-none"
                    >
                        <i className="fas fa-bars text-xl"></i>
                    </button>
                    <h1 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                        Disease Predictor
                    </h1>
                </div>

                <main className="flex-1 overflow-hidden p-6">
                    <div className="h-full overflow-auto">{children}</div>
                </main>
                <Footer />
            </div>
        </div>
    );
}