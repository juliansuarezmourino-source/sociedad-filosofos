export type Articulo = {
  titulo: string;
  fecha: string;
  autor: string;
  slug: string;
  descripcion: string;
  contenido: string;
};

export const articulos: Articulo[] = [
  {
    titulo: "El origen del idealismo alemán",
    fecha: "19 de julio de 2026",
    autor: "Julián Suárez Mouriño",
    slug: "origen-del-idealismo-aleman",
    descripcion:
      "Una introducción histórica al tránsito de Kant hacia el idealismo alemán.",
    contenido: `
Este será el primer ensayo publicado por la Sociedad de Filósofos Autodidactas.

De momento es únicamente un texto de prueba.

En los próximos pasos convertiremos este campo en el lugar donde escribirás tus ensayos completos.
`,
  },
];