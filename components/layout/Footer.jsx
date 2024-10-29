"use client";

export default function Footer() {
    return (
        <footer className="bg-secondary text-secondary-foreground p-4 sticky bottom-0">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} by AppWay</p>
            </div>
        </footer>
    );
};