export default function BibliotecaPage() {
  return (
    <main className="min-h-screen bg-stone-100 text-stone-900">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-12">

        <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-8 md:mb-10">
          Biblioteca
        </h1>

        <p className="text-xl leading-10 text-stone-700 mb-10">
          La Biblioteca de la Sociedad de Filósofos Autodidactas será un archivo con las grandes obras del pensamiento
          en las mejores ediciones que quepa encontrar que sean de dominio público.
        </p>

        <div className="rounded-xl border border-stone-300 bg-white p-6 md:p-8 shadow-sm">

          <h2 className="text-2xl font-semibold mb-4">
            Próximamente
          </h2>

          <p className="text-lg leading-8 text-stone-700">
            La biblioteca digital se encuentra actualmente en construcción.
          </p>

        </div>

      </div>
    </main>
  );
}