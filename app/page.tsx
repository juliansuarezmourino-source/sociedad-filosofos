import Image from "next/image";

import { supabase } from "./lib/supabase";
export const dynamic = "force-dynamic";



export default async function Home() {
const { data, error } = await supabase
  .from("articulos")
  .select("*")
  .order("created_at", { ascending: false });

console.log("DATA:", data);
console.log("ERROR:", error);

const ultimoArticulo = data?.[0];


  return (
    <main className="min-h-screen bg-stone-100 text-stone-900">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 md:py-10">

        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-serif font-semibold tracking-tight text-center">
            Sociedad de Filósofos Autodidactas
          </h1>
        </header>

        <section className="grid md:grid-cols-[1.2fr_1fr] gap-12 items-start">

        <article className="border border-stone-300 rounded-xl p-6 md:p-10 bg-white shadow-sm">
            <h2 className="text-xl md:text-2xl font-semibold mb-6">
              <strong>
                UNA SOCIEDAD PARA INDIVIDUOS QUE SE IMPUTAN A SÍ MISMOS LA RESPONSABILIDAD DE FORMARSE
              </strong>
            </h2>

            <p className="text-lg md:text-xl leading-8 md:leading-10 text-stone-700">
              La Sociedad de Filósofos Autodidactas nace con el propósito de
              reunir, fundamentalmente, a quienes estudian filosofía motu proprio y al margen del ámbito universitario,
              identidad que no constituye ningún desprecio a la persona vinculada a la administración de la enseñaza (cuya participación también pedimos),
              sino que, sencillamente, marca un hecho identitario y funda una razón social no excluyente. 
              Este proyecto comienza como una comunidad de
              intereses que crecerá progresivamente mediante publicaciones, una
              biblioteca digital, el canal de YouTube Julián Suárez Mouriño y futuras iniciativas de
              educación mutua y gratuita.
            </p>
             
<section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">

<a
  href="/publicaciones"
  className="border border-stone-400 rounded-lg py-4 px-6 text-lg font-medium text-center hover:bg-stone-900 hover:text-white transition duration-300"
>
  Publicaciones
</a>

<a
  href="/revista"
  className="border border-stone-400 rounded-lg py-4 px-6 text-lg font-medium text-center hover:bg-stone-900 hover:text-white transition duration-300"
>
  Revista Momentum
</a>

<a
  href="/biblioteca"
  className="border border-stone-400 rounded-lg py-4 px-6 text-lg font-medium text-center hover:bg-stone-900 hover:text-white transition duration-300"
>
  Biblioteca
</a>

<a
  href="/quiero-ser-parte"
  className="border border-stone-400 rounded-lg py-4 px-6 text-lg font-medium text-center hover:bg-stone-900 hover:text-white transition duration-300"
>
  Quiero ser parte
</a>

</section>
          </article>

<div className="flex flex-col items-center">

  <Image
    src="/images/perfil.png"
    alt="Julián Suárez"
    width={430}
    height={430}
    className="rounded-xl shadow-lg w-full h-auto max-w-[430px]"
  />

  <div className="mt-4 w-full rounded-xl border border-stone-300 bg-stone-50 p-6 md:p-8 shadow-sm">

    <h3 className="text-2xl font-serif font-semibold border-b border-stone-300 pb-3 mb-6">
      Contacto
    </h3>

<div>

  <p className="text-xs uppercase tracking-[0.2em] text-stone-500 font-semibold">
    Fundador
  </p>

  <p className="mt-2 text-lg font-semibold">
    Julián Suárez Mouriño
  </p>

  <a
    href="mailto:juliansuarezmourino@gmail.com"
    className="mt-1 block text-stone-600 hover:text-black hover:underline"
  >
    ✉ juliansuarezmourino@gmail.com
  </a>

</div>

    <div className="mt-6">
      <div className="mt-8 border-t border-stone-300 pt-6">

  <p className="text-xs uppercase tracking-[0.2em] text-stone-500 font-semibold">
    Presidenta
  </p>

  <p className="mt-2 text-xl font-semibold">
    Viviana Sangenis Bernal
  </p>

  <a
    href="mailto:viviana.sangenis@gmail.com"
    className="mt-1 block text-stone-600 hover:text-black hover:underline"
  >
    ✉ viviana.sangenis@gmail.com
  </a>

</div>
    </div>

  </div>

</div>

        </section>


{ultimoArticulo && (
  <section className="mt-12">

    <h2 className="text-2xl md:text-3xl font-serif font-semibold">
      Últimas publicaciones
    </h2>

    <div className="mt-6 rounded-xl border border-stone-300 bg-white p-6 md:p-8 shadow-sm">

      <a
        href={`/articulos/${ultimoArticulo.slug}`}
        className="text-2xl font-semibold hover:underline"
      >
        {ultimoArticulo.titulo}
      </a>

      <p className="mt-3 text-stone-700">
        {ultimoArticulo.descripcion}
      </p>

      <p className="mt-3 text-sm text-stone-500">
        {ultimoArticulo.autor} · {ultimoArticulo.fecha}
      </p>

    </div>

  </section>
)}
      </div>
    </main>
  );
}