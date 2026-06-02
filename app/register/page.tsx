"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const response = await fetch(
      "/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    if (response.ok) {
      alert("Registration successful!");
      setEmail("");
      setPassword("");
    } else {
      alert("Registration failed");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">
        Register
      </h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        className="border p-2 block mt-4 w-80"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        className="border p-2 block mt-4 w-80"
      />

      <button
        onClick={handleRegister}
        className="border p-2 mt-4"
      >
        Register
      </button>
    </div>
  );
}