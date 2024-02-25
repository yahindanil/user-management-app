import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

function Register() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRegisterError("");

    const { data: existingUsers, error: searchError } = await supabase
      .from("users")
      .select("email, name")
      .or(`email.eq.${email},name.eq.${name}`);

    if (existingUsers.length > 0) {
      setRegisterError(
        "An account with this email or username already exists."
      );
      setLoading(false);
      return;
    }

    const currentTime = new Date().toISOString();

    const { data, error } = await supabase.from("users").insert([
      {
        name: name,
        email: email,
        password: password,
        registrationTime: currentTime,
        lastLoginTime: currentTime,
        status: "active",
      },
    ]);

    setLoading(false);

    if (error) {
      console.error("Registration error:", error.message);
      setRegisterError("Failed to register. Please try again.");
    } else {
      navigate("/userManagementTable");
    }
  };

  return (
    <div className="max-w-md mx-auto my-10">
      <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
      <form onSubmit={handleRegister} className="space-y-4">
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
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            className="mt-1 mb-7 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300"
        >
          {loading ? "Registering..." : "Register"}
        </button>
        {registerError && <p className="text-red-500">{registerError}</p>}
        <div className="mt-4 text-center">
          <Link to="/" className="text-indigo-600 hover:text-indigo-500">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
