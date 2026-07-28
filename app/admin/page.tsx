"use client";
import { supabase } from "../lib/supabase";
import { FormEvent, useEffect, useState } from "react";
import TiptapEditor from "./components/TiptapEditor";
export default function AdminPage() {
const [articulos, setArticulos] = useState<any[]>([]);
const [articuloEditando, setArticuloEditando] = useState<any>(null);
const [contenidoEditor, setContenidoEditor] = useState("");
useEffect(() => {
  cargarArticulos();
}, []);
useEffect(() => {
    console.log("articuloEditando:", articuloEditando);
    console.log("articulos:", articulos);
}, [articuloEditando]);
async function cargarArticulos() {
  const { data } = await supabase
    .from("articulos")
    .select("*")
    .order("created_at", { ascending: false });
console.log("data:", data);
  setArticulos(data ?? []);
}
async function eliminarArticulo(id: number) {
  const { error } = await supabase
    .from("articulos")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    return;
  }

  await cargarArticulos();
}
async function publicarArticulo(
  event: FormEvent<HTMLFormElement>
) {
  event.preventDefault();
const formulario = event.currentTarget;
  const form = new FormData(event.currentTarget);

const titulo = form.get("titulo") as string;
const descripcion = form.get("descripcion") as string;
const contenido = contenidoEditor;
const autor = form.get("autor") as string;
const slug = titulo
  .toLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9\s-]/g, "")
  .trim()
  .replace(/\s+/g, "-");

let error = null;

if (articuloEditando) {
    ({ error } = await supabase
        .from("articulos")
        .update({
            titulo,
            slug,
            descripcion,
            contenido,
            autor,
        })
        .eq("id", articuloEditando.id));
} else {
    ({ error } = await supabase.from("articulos").insert({
        titulo,
        slug,
        descripcion,
        contenido,
        autor,
        publicado: true,
    }));
}

if (error) {
  console.error(error);
  return;
}

alert("Artículo publicado correctamente");
await cargarArticulos();
setArticuloEditando(null);
formulario.reset();
}

  return (
    <main className="min-h-screen bg-stone-100">
      <div className="w-full max-w-none px-12 py-10">

        <h1 className="text-5xl font-serif font-semibold mb-10">
          Panel de administración
        </h1>





<form
  onSubmit={publicarArticulo}
  className="bg-white rounded-xl border border-stone-300 p-8 shadow-sm space-y-6"
>

          <div>
            <label className="block font-semibold mb-2">
              Título
            </label>

<input
  type="text"
  name="titulo"
  defaultValue={articuloEditando?.titulo ?? ""}
  className="w-full border rounded-lg p-3"
  required
/>
          </div>

<div>
  <label className="block font-semibold mb-2">
    Contenido
  </label>

  <TiptapEditor
    onChange={setContenidoEditor}
  />

  <input
    type="hidden"
    name="contenido"
    value={contenidoEditor}
  />
</div>



<div>
  <label className="block font-semibold mb-2">
    Autor
  </label>

  <input
    type="text"
    name="autor"
    defaultValue={articuloEditando?.autor ?? "Julián Suárez Mouriño"}
    className="w-full border rounded-lg p-3"
    required
  />
</div>

<button
  type="submit"
  className="bg-black text-white px-8 py-3 rounded-lg"
>
{articuloEditando ? "Guardar cambios" : "Publicar artículo"}
</button>

</form>

<div className="mt-12">
  <h2 className="text-3xl font-serif font-semibold mb-6">
    Artículos publicados
  </h2>
  <p>Artículo en edición: {articuloEditando?.titulo ?? "ninguno"}</p>

  {articulos.map((articulo) => (
    <div
      key={articulo.id}
      className="border rounded-lg p-5 mb-4 bg-white"
    >
      <h3 className="text-xl font-semibold">
        {articulo.titulo}
      </h3>

      <p className="text-stone-600 mt-2">
        {articulo.descripcion}
      </p>
      <div className="mt-4">
<button
  type="button"
  onClick={() => eliminarArticulo(articulo.id)}
  className="bg-red-600 text-white px-4 py-2 rounded-lg"
>
  Eliminar
</button>
<button
  type="button"
  onClick={() => setArticuloEditando(articulo)}
  className="bg-blue-600 text-white px-4 py-2 rounded-lg ml-2"
>
  Editar
</button>
</div>
    </div>
  ))}
</div>
</div>
</main>
);
}