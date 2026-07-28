export default function RevistaPage() {
  return (
    <main className="min-h-screen bg-stone-100 text-stone-900">
      <div className="max-w-5xl mx-auto px-8 py-12">

        <h1 className="text-5xl font-serif font-semibold mb-10">
          Revista Momentum
        </h1>

        <p className="text-xl leading-10 text-stone-700 mb-10">
          Momentum será la revista oficial de la Sociedad de Filósofos
          Autodidactas. En ella se publicarán las investigaciones de sus miembros
          asumiendo los criterios de rigor y publicidad académicos y científicos.
        </p>

        <div className="rounded-xl border border-stone-300 bg-white p-8 shadow-sm">

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