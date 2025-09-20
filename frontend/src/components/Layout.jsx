import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function Layout({ children }) {
    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar />
            <div className="flex-1 flex flex-col ml-64">
                <main className="flex-1 overflow-hidden p-6">
                    <div className="h-full overflow-auto">
                        {children}
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
}