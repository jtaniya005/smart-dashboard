import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)]">
			<header className="app-header border-b border-[var(--border)] bg-white/70 dark:bg-black/40 backdrop-blur-sm">
				<div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
					<Link to="/" className="text-xl font-semibold text-[var(--text-h)]">
						Smart Dashboard
					</Link>
					<nav className="flex items-center gap-3">
						<Link to="/dashboard" className="text-sm hover:underline">
							Dashboard
						</Link>
						<Link to="/" className="text-sm hover:underline">
							Login
						</Link>
					</nav>
				</div>
			</header>

			<main className="flex-grow">
				<div className="max-w-5xl mx-auto px-6 py-8">{children}</div>
			</main>

			<footer className="py-4 text-center text-sm text-[var(--text)] border-t border-[var(--border)]">
				Smart Dashboard © {new Date().getFullYear()}
			</footer>
		</div>
	);
}

function App() {
	return (
		<BrowserRouter>
			<Layout>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/dashboard" element={<Dashboard />} />
				</Routes>
			</Layout>
		</BrowserRouter>
	);
}

export default App;