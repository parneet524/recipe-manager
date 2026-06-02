"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin =
    async () => {
      const response =
        await fetch(
          "/api/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          }
        );

      if (response.ok) {
        alert(
          "Login successful!"
        );
      } else {
        alert("Login failed");
      }
    };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">
        Login
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
        onClick={handleLogin}
        className="border p-2 mt-4"
      >
        Login
      </button>
    </div>
  );
}