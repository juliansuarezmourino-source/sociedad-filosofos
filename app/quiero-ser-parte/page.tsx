"use client";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function QuieroSerPartePage() {
  const [participantes, setParticipantes] = useState<any[]>([]);

  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function cargarParticipantes() {
    const { data } = await supabase
      .from("participantes")
      .select("*")
      .order("created_at", { ascending: true });

    setParticipantes(data ?? []);
  }

  useEffect(() => {
    cargarParticipantes();
  }, []);

  async function enviarFormulario(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (enviando) return;
setEnviando(true);

    const { error } = await supabase
      .from("participantes")
      .insert({
        nombre,
        apellidos,
        email,
      });

if (error) {
  setEnviando(false);

  if (error.code === "P0001") {
    alert("Este correo no puede formar parte de la Sociedad de Filósofos Autodidactas.");
  } else if (error.code === "23505") {
    alert("Este correo ya forma parte de la Sociedad de Filósofos Autodidactas.");
  } else {
    alert("Error al guardar el participante.");
    console.error(error);
  }

  return;
}

    setNombre("");
    setApellidos("");
    setEmail("");

    await cargarParticipantes();
    setEnviando(false);
  }

  return (
    <main className="min-h-screen bg-stone-100 text-stone-900">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-6 md:py-12">
        <Link
  href="/"
  className="text-stone-600 hover:underline inline-block mb-6"
>
  ← Volver a la portada
</Link>

        <h1 className="text-3xl md:text-5xl font-serif font-semibold mb-8 md:mb-10">
          Quiero ser parte
        </h1>

        <p className="text-lg md:text-xl leading-8 md:leading-10 text-stone-700 mb-8 md:mb-10 text-justify">
          La Sociedad de Filósofos Autodidactas quiere la colaboración de todo individuo, académico o no, que considere
          el estudio de la filosofía un deber individual. Uno que puede y debe ser cumplido con independiencia
          del funcionamiento de las universidades y de la administración pública en general. Un deber individual que, 
          justamente por serlo, es también la razón de la colaboración consciente y del trabajo investigador bajo un sentido propio.
          Ojalá un horno de ciudadanos hechos con el martillo de la virtud íntima y privada y no uno de panes calientes cocidos
          en la comodidad de los despachos y pupitres universitarios, aperitivos del mercado.
          Uníos gratuitamente, en definitiva, todos cuantos queráis formar parte de unas iniciativas de estudio, publicación
          e investigación independientes, que se irán definiendo a medida que crezcamos, tanto aquí, como en el corazón de este proyecto:
          el canal de youtube Julián Suárez Mouriño. Una vez introduzcáis vuestros datos, vuestro nombre aparecerá en la sección 
          de participantes, reflejando simbólicamente vuestro apoyo tal que un índice del crecimiento de esta iniciativa. Vuestro correo electrónico solo será usado para 
          enviaros comunicaciones referentes al desarrollo y actividad de la Sociedad, bajo estricta observancia de la Ley Orgánica de 
          Protección de Datos.
          
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-start">

          <section className="rounded-xl border border-stone-300 bg-white p-6 md:p-8 shadow-sm">

            <h2 className="text-2xl font-semibold mb-6">
              Solicitud de incorporación
            </h2>

            <form
              onSubmit={enviarFormulario}
              className="space-y-5"
            >

              <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full rounded-lg border border-stone-300 px-4 py-3"
                required
              />

              <input
                type="text"
                placeholder="Apellidos"
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
                className="w-full rounded-lg border border-stone-300 px-4 py-3"
                required
              />

              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-stone-300 px-4 py-3"
                required
              />

<button
  type="submit"
  disabled={enviando}
  className="w-full rounded-lg bg-stone-900 py-3 text-white disabled:opacity-50 disabled:cursor-not-allowed"
>
  {enviando ? "Enviando..." : "Quiero ser parte"}
</button>
             

<label className="flex items-start gap-3 text-sm text-stone-600 leading-6">

  <input
    type="checkbox"
    required
    className="mt-1"
  />

  <span>
    He leído y acepto que la Sociedad de Filósofos Autodidactas trate los datos
    facilitados (nombre, apellidos y correo electrónico) con la única finalidad
    de enviarme comunicaciones relacionadas con la Sociedad. 
    Puede solicitar el acceso, rectificación o supresión de sus datos 
    escribiendo a la Presidenta de la Sociedad <strong>viviana.sangenis@gmail.com</strong>.
  </span>

</label>

            </form>

          </section>

          <aside className="rounded-xl border border-stone-300 bg-white p-6 md:p-8 shadow-sm self-start">

            <h2 className="text-2xl font-semibold mb-6">
              Participantes
            </h2>
                        {participantes.length === 0 ? (

              <p className="text-stone-500">
                Todavía no hay participantes.
              </p>

            ) : (

              <ul className="space-y-3">

                {participantes.map((participante) => (

                  <li
                    key={participante.id}
                    className="border-b border-stone-200 pb-3"
                  >
                    <p className="font-semibold">
                      {participante.nombre} {participante.apellidos}
                    </p>
                  </li>

                ))}

              </ul>

            )}

          </aside>

        </div>

      </div>

    </main>
  );
}