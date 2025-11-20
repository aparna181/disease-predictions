import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Predict from "./pages/Predict";
import LogsPage from "./pages/LogsPage";
import ThemeToggle from "./components/ThemeToggle";

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/predict" element={<Predict />} />
                    <Route path="/logs" element={<LogsPage />} />
                </Routes>
                {/* Always visible floating button */}
                <ThemeToggle />
            </Layout>
        </Router>
    );
}

export default App;
