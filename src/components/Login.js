import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

function Login() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError("");

    const { data: userData, error } = await supabase
      .from("users")
      .select("*")
      .eq("name", name)
      .eq("password", password)
      .single();

    setLoading(false);

    if (!userData) {
      setLoginError("Login failed. Please check your username and password.");
      return;
    }

    if (userData.status === "blocked") {
      setLoginError("This user has been blocked.");
      return;
    }

    if (userData.status !== "active") {
      setLoginError("Your account is not active. Please contact support.");
      return;
    }

    navigate("/userManagementTable");
  };

  return (
    <div className="max-w-md mx-auto my-10">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {loginError && <p className="text-red-500">{loginError}</p>}
        <div className="mt-4 text-center">
          <Link
            to="/register"
            className="text-indigo-600 hover:text-indigo-500"
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
