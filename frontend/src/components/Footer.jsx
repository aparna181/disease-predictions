export default function Footer() {
    return (
        <footer className="w-full bg-gray-100 dark:bg-gray-950 border-t border-gray-300 dark:border-gray-700 py-3 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
                © {new Date().getFullYear()} Disease Predictor | Built for Hackathon
            </p>
        </footer>
    );
}
