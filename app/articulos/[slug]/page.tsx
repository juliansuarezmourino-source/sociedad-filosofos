import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default async function ArticuloPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

 const { data: articulo } = await supabase
  .from("articulos")
  .select("*")
  .eq("slug", slug)
  .single();

 if (!articulo) {
  return <h1>Artículo no encontrado.</h1>;
}

console.log(articulo.contenido);

return (
  <main className="min-h-screen bg-stone-100 text-stone-900">
      <article className="max-w-3xl mx-auto px-8 py-16">
        <Link
          href="/publicaciones"
          className="text-stone-600 hover:underline"
        >
          ← Volver a publicaciones
        </Link>

        <h1 className="text-5xl font-serif font-semibold mt-8 mb-4">
          {articulo.titulo}
        </h1>

        <p className="text-stone-500 text-lg mb-12">
          {articulo.autor} · {articulo.fecha}
        </p>

<div
className="
  prose
  prose-lg
  prose-stone
  font-serif
  max-w-none
  break-all
  text-left
  leading-loose

 
  [&>p]:mb-0


  [&>h1]:mt-12
  [&>h1]:mb-6

  [&>h2]:mt-10
  [&>h2]:mb-5

  [&>h3]:mt-8
  [&>h3]:mb-4
"
  dangerouslySetInnerHTML={{
    __html: articulo.contenido,
  }}
/>
      </article>
    </main>
  );
}