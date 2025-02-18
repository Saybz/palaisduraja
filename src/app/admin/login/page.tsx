"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

interface SignInResponse {
    error?: string;
}

interface HandleLoginEvent extends React.FormEvent<HTMLFormElement> {}

const handleLogin = async (e: HandleLoginEvent): Promise<void> => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
    }) as SignInResponse | undefined;

    if (res?.error) {
        setError("Nom d'utilisateur ou mot de passe incorrect");
    } else {
        router.push("/admin");
    }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-dark">
      <form onSubmit={handleLogin} className="bg-white p-6 shadow-md rounded-md">
        <h2 className="text-xl font-bold mb-4">Connexion Admin</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Se connecter
        </button>
      </form>
    </div>
  );
}
