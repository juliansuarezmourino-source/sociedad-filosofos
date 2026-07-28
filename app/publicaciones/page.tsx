import { supabase } from "../lib/supabase";

export default async function PublicacionesPage() {
  const { data: articulos, error } = await supabase
    .from("articulos")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-stone-100 text-stone-900">
      <div className="max-w-5xl mx-auto px-8 py-12">
        <h1 className="text-5xl font-serif font-semibold mb-10">
          Publicaciones
        </h1>

        <p className="text-xl leading-10 text-stone-700 mb-10">
          Este espacio reúne las noticias de la Sociedad, artículos, ensayos breves, notas de lectura
          y demás trabajos elaborados por los miembros de la Sociedad de Filósofos
          Autodidactas. La esperanza, en un futuro, es que el fruto de la investigación de los autodidactas, el artículo propiamente científico, viva en la Revista Momemtum.
        </p>

        <div className="rounded-xl border border-stone-300 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-8">
            Archivo de publicaciones
          </h2>

          {articulos?.map((articulo) => (
            <article
              key={articulo.slug}
              className="border-b border-stone-200 py-6 last:border-b-0"
            >
              <a
                href={`/articulos/${articulo.slug}`}
                className="text-2xl font-semibold hover:underline"
              >
                {articulo.titulo}
              </a>

              <p className="mt-3 text-stone-700">
                {articulo.descripcion}
              </p>

              <p className="mt-3 text-sm text-stone-500">
                {articulo.autor} · {articulo.fecha}
              </p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}