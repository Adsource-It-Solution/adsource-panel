"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ClientOnly } from "@/app/components/ClientOnly";
import { motion } from "framer-motion";

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
    <div className="flex items-center justify-center min-h-screen bg-[#021526] px-4">

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-4xl bg-[#031c2c] rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(0,255,255,0.3)] border border-cyan-400/40 flex"
      >

        {/* LEFT LOGIN PANEL */}
        <div className="w-1/2 px-10 py-12 text-white flex flex-col justify-center">
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold mb-8 text-center"
          >
            Login
          </motion.h2>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <label className="text-sm">Username</label>
              <div className="flex items-center border-b border-gray-400 mt-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent py-2 px-1 focus:outline-none text-white"
                  required
                />
                <span className="text-gray-300">👤</span>
              </div>
            </motion.div>

            {/* Password */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <label className="text-sm">Password</label>
              <div className="flex items-center border-b border-gray-400 mt-1">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent py-2 px-1 focus:outline-none text-white"
                  required
                />
                <span className="text-gray-300">🔒</span>
              </div>
            </motion.div>

            {error && <p className="text-red-400 text-center">{error}</p>}

            {/* Login Button */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full bg-gradient-to-r from-cyan-400 to-teal-500 text-white font-semibold shadow-[0_0_15px_rgba(0,255,255,0.5)] hover:shadow-[0_0_25px_rgba(0,255,255,0.8)] transition-all"
            >
              {loading ? "Logging in..." : "Login"}
            </motion.button>
          </form>
        </div>

        {/* RIGHT PANEL with DIAGONAL CLIP */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="w-1/2"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 20% 100%)",
          }}
        >
          <div className="h-full bg-gradient-to-br from-cyan-400 to-teal-500 opacity-90 flex flex-col items-center justify-center text-white p-10">
            <h2 className="text-4xl font-extrabold text-center">
              WELCOME <br /> BACK!
            </h2>
            <p className="mt-4 text-center text-white/90">
                    Login and get start working with us. 
            </p>
            <p className="mt-4 text-center text-white/90">
                  ❤️ Love to have you back.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </ClientOnly>

  );
}
