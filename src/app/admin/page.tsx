"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import AdminDashboard from "./AdminDashboard";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/products", {
      headers: { "x-admin-password": password },
    });
    if (res.ok) {
      setAuthenticated(true);
    } else {
      setError("Contraseña incorrecta");
    }
  };

  if (authenticated) return <AdminDashboard password={password} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Lock className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">Panel Admin</h1>
        <p className="text-center text-gray-500 mb-8">Berbelis</p>
        <form onSubmit={handleLogin} className="space-y-4">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <input
            type="password"
            placeholder="Contraseña de administrador"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}
