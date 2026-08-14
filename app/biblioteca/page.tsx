import Link from "next/link";
import { supabase } from "../lib/supabase";

export default async function BibliotecaPage() {
  const { data: obras, error } = await supabase
    .from("biblioteca_obras")
    .select("*")
    .order("titulo", { ascending: true });

  if (error) {
    console.error(error);
  }

  return (
    <main className="min-h-screen bg-stone-100 text-stone-900">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <Link
          href="/"
          className="text-stone-600 hover:underline inline-block mb-6"
        >
          ← Volver a la portada
        </Link>

        <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-8">
          Biblioteca
        </h1>

       <p className="text-xl leading-10 text-stone-700 mb-10 text-justify">
          La Biblioteca de la Sociedad de Filósofos Autodidactas será un
          archivo con las grandes obras del pensamiento en las mejores
          ediciones que quepa encontrar que sean de dominio público. Su destino principal será facilitar
          la investigación con visos de rigor científico de los autodidactas.
          Todo aquello que sea autoridad científica al respecto de cada tema y que no pueda alojarse aquí
          por cuestiones jurídicas será referenciado como consejo para su estricta consideración investigadora. 
        </p>

        {error ? (
          <div className="rounded-xl border border-red-300 bg-red-50 p-6">
            <h2 className="text-xl font-semibold mb-2">
              No se ha podido cargar la Biblioteca
            </h2>
            <p className="text-red-700">
              Se ha producido un error al consultar la base de datos.
            </p>
          </div>
        ) : obras && obras.length > 0 ? (
          <div className="space-y-6">
            {obras.map((obra) => (
              <article
                key={obra.id}
                className="rounded-xl border border-stone-300 bg-white p-6 shadow-sm"
              >
<h2 className="text-2xl font-semibold mb-3">
  <Link
    href={`/biblioteca/${obra.slug}`}
    className="hover:underline"
  >
    {obra.titulo}
  </Link>
</h2>

                <p className="text-lg text-stone-700">
                  {obra.descripcion}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-stone-300 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">
              Próximamente
            </h2>

            <p className="text-lg text-stone-700">
              La biblioteca digital se encuentra actualmente en construcción.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}