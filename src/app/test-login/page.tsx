"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function TestLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    console.log(res);
  };

  return (
    <div className="p-10">
      <input
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2"
      />
      <br />
      <input
        placeholder="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mt-2"
      />
      <br />
      <button onClick={handleLogin} className="bg-black text-white p-2 mt-2">
        Login
      </button>
    </div>
  );
}
