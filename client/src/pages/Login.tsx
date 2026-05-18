import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const res = await api.post("/auth/login", { email, password });
			localStorage.setItem("token", res.data.token);
			navigate("/dashboard");
		} catch {
			alert("Login failed");
		}
	};

	return (
		<div className="min-h-[70vh] flex items-center justify-center">
			<form
				onSubmit={handleLogin}
				className="w-full max-w-md bg-white/70 dark:bg-gray-900/70 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-[var(--border)] space-y-6"
			>
				<div>
					<h1 className="text-2xl font-semibold text-[var(--text-h)]">Welcome back</h1>
					<p className="text-sm text-[var(--text)] mt-1">Sign in to continue to Smart Dashboard</p>
				</div>

				<div className="space-y-2">
					<label className="text-sm block text-[var(--text)]">Email</label>
					<input
						className="border p-2 w-full rounded-md focus:ring-2 focus:ring-[var(--accent)]"
						placeholder="you@company.com"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<div className="space-y-2">
					<label className="text-sm block text-[var(--text)]">Password</label>
					<input
						type="password"
						className="border p-2 w-full rounded-md focus:ring-2 focus:ring-[var(--accent)]"
						placeholder="••••••••"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<button className="bg-[var(--accent)] hover:brightness-105 text-white px-4 py-2 w-full rounded-md transition">
					Sign in
				</button>

				<div className="text-center text-sm text-[var(--text)]">
					<a href="#" className="hover:underline">
						Forgot password?
					</a>
				</div>
			</form>
		</div>
	);
}

export default Login;