"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ClientOnly } from "@/app/components/ClientOnly";

export default function LoginPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
  
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }
  
      // 🧠 Handle both string and array roles
      const roles = Array.isArray(data.role) ? data.role : [data.role];
      const primaryRole = roles[0]?.toLowerCase(); // pick first or prefer ngo, etc.
  
      localStorage.setItem("token", data.token);
  
      // ✅ Role-based redirection
      if (roles.includes("admin")) {
        router.push("/admin-dashboard");
      } else if (roles.includes("ngo")) {
        router.push("/user-dashboard");
      } else if (roles.includes("solar")) {
        router.push("/user-dashboard");
      } else if (roles.includes("billing")) {
        router.push("/user-dashboard");
      } else {
        setError("Invalid role");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <ClientOnly>
      <div
        className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-900 via-slate-800 to-gray-900"
      >
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg w-96 border border-gray-700">
          <h1 className="text-3xl font-bold mb-6 text-center text-white">
            Role-Based Login
          </h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-white">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/90"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-white">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/90"
                required
              />
            </div>

            {error && <p className="text-red-400 text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </ClientOnly>
  );
}
