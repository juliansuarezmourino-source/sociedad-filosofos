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
  const autoresPorTitulo: Record<string, string> = {
  Ilíada: "Homero",
  Odisea: "Homero",
  Teogonía: "Hesíodo",
  "Trabajos y días": "Hesíodo",
};

const recursosPorAutor = (recursos ?? []).reduce(
  (acc: Record<string, any[]>, recurso) => {
    const autor = autoresPorTitulo[recurso.titulo] || "Otros recursos";

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
          «Filosofía presocrática»
        </h1>

        <p className="text-xl leading-10 text-stone-700 mb-8">
          Selección de textos y recursos digitales para el estudio de la
          «filosofía presocrática».
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
            es de la índole «géneros poéticos griegos» y no de la
            índole «filosofía», índole aquella que alude a la posibilidad de una
            comprensión sincrónica de la «filosofía presocrática». Es decir, que la vinculación legítima de estos
            «pensadores» es más bien en relación a Homero y a Hesíodo y no en
            relación a Platón y a Aristóteles. A pesar de ello, siendo (Sócrates-)Platón, 
            en relación con las fuentes con las que contamos, el teórico de la identidad
            «filosofía», la inclusión de cuanta obra de «género poético» o «literario» se incluya anterior a Platón
            se hará, siempre problemáticamente, también por hipotética relación con dicha identidad (es decir:
            también bajo un sentido diacrónico). No será ya tan problemático
            el saber qué incluimos y qué dejamos fuera como filosofía una vez tal identidad emerge clara a la conciencia
            griega y puede el griego decidir, a sabiendas, ser lo uno o lo otro (Siglos V-IV a.C.).
            Así es que Sófocles, en la medida en que, asumiremos, pudo decidir tal cosa, quedará fuera de dicha historia, mientras que Hesíodo dentro. 
            Sin embargo, la menor dificultad convencional no implica que no se 
            mantenga en pie la eterna duda de 
            si es lícito tomar la noción de «filósofo» de Platón (o de cualquier otro) como regla
            de la identidad de nada, es decir, si, por ejemplo, Sófocles aceptó la alternativa en los términos
            que cristalizarán en la obra de Platón y efectivamente
            decidió no ser filósofo, o solo decidió no serlo a la manera platónica.
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

<Link
  href="/biblioteca/filosofia-presocratica/felipe-martinez-marzoa-hacia-una-hermeneutica-de-los-generos-poeticos-griegos"
  target="_blank"
  rel="noopener noreferrer"
  className="font-semibold hover:underline"
>
  Leer artículo →
</Link>
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
    Disponibilidad: consulta online y descarga cuando sea legítimo
  </h2>

  <p className="text-sm text-stone-500 mb-6">
    Nota: Los recursos de Scaife ATLAS (Perseus) pueden tardar unos segundos en cargar.
    Durante ese intervalo, el navegador puede mostrar temporalmente un mensaje
    de error de conexión. La página debería cargarse automáticamente al cabo
    de unos instantes.
  </p>

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
      const autor =
        autoresPorTitulo[recurso.titulo] || "Otros recursos";

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
          (acc: Record<string, any[]>, recurso) => {
            const titulo = recurso.titulo || "Sin título";

            if (!acc[titulo]) {
              acc[titulo] = [];
            }

            acc[titulo].push(recurso);

            return acc;
          },
          {}
        );

        return (
          <section key={autor}>
            <h3 className="text-2xl font-semibold mb-4">
              {autor}
            </h3>

            <div className="space-y-6">

              {Object.entries(obras).map(([titulo, recursosObra]) => {

                const consultasOnline = recursosObra.filter(
                  (recurso) => recurso.tipo === "texto"
                );

                const descargas = recursosObra.filter(
                  (recurso) => recurso.tipo === "descarga"
                );

                return (
                  <div key={titulo} className="space-y-2">

                    <h4 className="text-xl font-semibold">
                      <em>{titulo}</em>
                    </h4>

                    {consultasOnline.length > 0 && (
                      <p className="text-lg text-stone-700">
                        <span className="font-medium">
                          Consulta online:
                        </span>{" "}
                        {consultasOnline.map((recurso, index) => (
                          <span key={recurso.id}>
                            <a
                              href={recurso.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline"
                            >
                              {recurso.idioma}
                            </a>
                            {index < consultasOnline.length - 1 && " · "}
                          </span>
                        ))}
                      </p>
                    )}

                    {descargas.map((recurso) => (
                      <p
                        key={recurso.id}
                        className="text-lg text-stone-700"
                      >
                        <span className="font-medium">
                          Descarga libre de derechos:
                        </span>{" "}
                        {recurso.descripcion}{" "}
                        <a
                          href={recurso.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold hover:underline"
                        >
                          [PDF]
                        </a>
                      </p>
                    ))}

                  </div>
                );
              })}

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