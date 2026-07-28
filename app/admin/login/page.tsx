"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

async function iniciarSesion(e: React.FormEvent) {
  e.preventDefault();

  const respuesta = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      usuario,
      password,
    }),
  });

  if (respuesta.ok) {
    router.push("/admin");
  } else {
    alert("Usuario o contraseña incorrectos.");
  }
}

  return (
    <main className="min-h-screen bg-stone-100 flex items-center justify-center p-6">
      <form
        onSubmit={iniciarSesion}
        className="w-full max-w-md rounded-xl border border-stone-300 bg-white p-8 shadow-sm space-y-6"
      >
        <h1 className="text-3xl font-serif font-semibold text-center">
          Acceso al administrador
        </h1>

        <div>
          <label className="block mb-2 font-semibold">
            Usuario
          </label>

          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Contraseña
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white rounded-lg py-3"
        >
          Entrar
        </button>
      </form>
    </main>
  );
}