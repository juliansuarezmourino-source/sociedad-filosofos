import Link from "next/link";
export default function RevistaPage() {
  return (
    <main className="min-h-screen bg-stone-100 text-stone-900">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <Link
  href="/"
  className="text-stone-600 hover:underline inline-block mb-6"
>
  ← Volver a la portada
</Link>

        <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-8 md:mb-10">
          Revista Momentum
        </h1>

        <p className="text-lg md:text-xl leading-8 md:leading-10 text-stone-700 mb-8 md:mb-10">
          Momentum será la revista oficial de la Sociedad de Filósofos
          Autodidactas. En ella se publicarán las investigaciones de sus miembros
          asumiendo los criterios de rigor y publicidad académicos y científicos.
        </p>

        <div className="rounded-xl border border-stone-300 bg-white p-6 md:p-8 shadow-sm">

          <h2 className="text-2xl font-semibold mb-4">
            Próximamente
          </h2>

          <p className="text-lg leading-8 text-stone-700">
            La revista se encuentra actualmente en fase de preparación.
          </p>

        </div>

      </div>
    </main>
  );
}