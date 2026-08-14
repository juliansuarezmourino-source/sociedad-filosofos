import Link from "next/link";
import { supabase } from "../../lib/supabase";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BibliotecaObraPage({ params }: Props) {
  const { slug } = await params;

  const { data: obra, error: obraError } = await supabase
    .from("biblioteca_obras")
    .select("*")
    .eq("slug", slug)
    .single();

const { data: recursos, error: recursosError } = obra
  ? await supabase
      .from("biblioteca_recursos")
      .select("*")
      .eq("obra_id", obra.id)
      .order("orden", { ascending: true })
  : { data: null, error: null };
  const recursosPorAutor = (recursos ?? []).reduce(
  (acc: Record<string, any[]>, recurso) => {
    const autor = recurso.autor || "Otros recursos";

    if (!acc[autor]) {
      acc[autor] = [];
    }

    acc[autor].push(recurso);

    return acc;
  },
  {}
);

  if (obraError || !obra) {
    return (
      <main className="min-h-screen bg-stone-100 text-stone-900">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-12">
          <Link
            href="/biblioteca"
            className="text-stone-600 hover:underline inline-block mb-6"
          >
            ← Volver a la Biblioteca
          </Link>

          <div className="rounded-xl border border-red-300 bg-red-50 p-6">
            <h1 className="text-2xl font-semibold mb-2">
              Obra no encontrada
            </h1>
            <p className="text-red-700">
              No se ha podido encontrar esta obra en la Biblioteca.
            </p>
          </div>
        </div>
      </main>
    );
  }

  const articuloMarzoa = recursos?.find(
    (recurso) => recurso.tipo === "articulo_metodologico"
  );

  const recursosDigitales =
    recursos?.filter(
      (recurso) => recurso.tipo !== "articulo_metodologico"
    ) ?? [];

  return (
    <main className="min-h-screen bg-stone-100 text-stone-900">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-12">

        <Link
          href="/biblioteca"
          className="text-stone-600 hover:underline inline-block mb-6"
        >
          ← Volver a la Biblioteca
        </Link>

        <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-6">
          Filosofía presocrática
        </h1>

        <p className="text-xl leading-10 text-stone-700 mb-8">
          Selección de textos y recursos digitales para el estudio de la
          filosofía presocrática.
        </p>

        {/* NOTA METODOLÓGICA */}

        <section className="mb-8 rounded-xl border border-stone-300 bg-white p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Nota metodológica
          </h2>

          <p className="text-lg leading-8 text-stone-700 text-justify">
            La posición del Fundador de la Sociedad de Filósofos Autodidactas
            en cuanto a la historia de la filosofía es la de Felipe Martínez
            Marzoa, posición que reconoce y con la cual es consecuente, pero que
            no pretende convertir en una obligación «ideológica» de sus socios. En cualquier
            caso, reconocerla implica que él no considere
            filosóficamente legítimo concepto alguno denominado «filosofía
            presocrática» sino como cliché historiográfico, pero, dado que el
            cliché en cuestión conserva su utilidad como convención científica
            de la investigación, este se respetará, si bien con la reserva de
            que el Fundador juzga que la pertenencia de Tales, Parménides, etc.,
            es de la índole «géneros poéticos griegos arcaicos» y no de la
            índole «filosofía». Es decir, que la vinculación legítima de estos
            «pensadores» es más bien en relación a Homero y a Hesíodo y no en
            relación a Platón y a Aristóteles.
          </p>
        </section>

        {/* MARZOA */}

        {articuloMarzoa?.url && (
          <section className="mb-10 rounded-xl border border-stone-300 bg-white p-6">
            <h2 className="text-2xl font-semibold mb-3">
              Felipe Martínez Marzoa,{" "}
              <em>Hacia una hermenéutica de los géneros poéticos griegos</em>
            </h2>

            <p className="text-lg leading-8 text-stone-700 mb-4">
              Texto fundamental para la orientación metodológica de la
              Sociedad respecto de la denominada «filosofía presocrática».
            </p>

            <a
              href={articuloMarzoa.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline"
            >
              Leer artículo →
            </a>
          </section>
        )}

        {/* AUTORIDAD ACADÉMICA */}

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            Autoridad académica actual
          </h2>

          <p className="text-lg leading-8 text-stone-700">
            M. Laura Gemelli-Marciano,{" "}
            <em>Presocratici. Sentieri di sapienza</em>, Fondazione Lorenzo
            Valla, 2023–2025. Nueva edición crítica, revisada y ampliada, que
            incorpora el estado posterior de la investigación y establece
            concordancias con Diels-Kranz y otras colecciones modernas.
          </p>
        </section>

        {/* REFERENCIA HISTÓRICA */}

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            Referencia histórica y sistema de citación tradicional
          </h2>

          <p className="text-lg leading-8 text-stone-700">
            H. Diels / W. Kranz,{" "}
            <em>Die Fragmente der Vorsokratiker</em>. Obra fundamental para la
            historia de la edición de los presocráticos y todavía indispensable
            como sistema de referencia bibliográfica.
          </p>
        </section>

        {/* ALTERNATIVA EN ESPAÑOL */}

{/* DISPONIBILIDAD DIGITAL */}

<section className="mt-10">
  <h2 className="text-3xl font-semibold mb-6">
    Disponibilidad digital abierta
  </h2>

  {recursosError ? (
    <div className="rounded-xl border border-red-300 bg-red-50 p-6">
      <p className="text-red-700">
        No se han podido cargar los recursos digitales.
      </p>
    </div>
  ) : recursosDigitales.length > 0 ? (
    <div className="space-y-8">

      {Object.entries(
        recursosDigitales.reduce(
          (acc: Record<string, any[]>, recurso) => {
            const autor = recurso.autor || "Otros recursos";

            if (!acc[autor]) {
              acc[autor] = [];
            }

            acc[autor].push(recurso);

            return acc;
          },
          {}
        )
      ).map(([autor, recursosAutor]) => {

        const obras = recursosAutor.reduce(
          (acc: Record<string, any>, recurso) => {
            const titulo = recurso.titulo || "Sin título";

            if (!acc[titulo]) {
              acc[titulo] = {
                url: recurso.url,
                idiomas: [],
              };
            }

            if (recurso.idioma) {
              acc[titulo].idiomas.push(recurso.idioma);
            }

            return acc;
          },
          {}
        );

        return (
          <section key={autor}>
            <h3 className="text-2xl font-semibold mb-3">
              {autor}
            </h3>

            <div className="space-y-2">

              {Object.entries(obras).map(
                ([titulo, obra]) => (
                  <a
                    key={titulo}
                    href={obra.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-lg text-stone-700 hover:underline"
                  >
                    <em>{titulo}</em>
                    {" — "}
                    {obra.idiomas.join(" · ")}
                  </a>
                )
              )}

            </div>
          </section>
        );
      })}

    </div>
  ) : (
    <p className="text-lg text-stone-700">
      Todavía no hay recursos digitales asociados a esta sección.
    </p>
  )}
</section>

      </div>
    </main>
  );
}