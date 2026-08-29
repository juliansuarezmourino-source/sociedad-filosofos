import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { jwtVerify } from "jose";
import { AUTH_COOKIE, AUTH_SECRET } from "../../../../auth";

async function comprobarAdministrador() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;

  if (!token) {
    return false;
  }

  try {
    const secret = new TextEncoder().encode(AUTH_SECRET);

    await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });

    return true;
  } catch {
    return false;
  }
}

function obtenerSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!url || !secretKey) {
    throw new Error("Configuración de Supabase incompleta");
  }

  return createClient(url, secretKey);
}

export async function POST(request: Request) {
  if (!(await comprobarAdministrador())) {
    return NextResponse.json(
      { ok: false, error: "No autorizado" },
      { status: 401 }
    );
  }

  try {
    const supabase = obtenerSupabaseAdmin();
    const datos = await request.json();

    const { titulo, slug, descripcion, contenido, autor } = datos;

    if (!titulo || !slug || !contenido || !autor) {
      return NextResponse.json(
        { ok: false, error: "Faltan datos del artículo" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("articulos")
      .insert({
        titulo,
        slug,
        descripcion: descripcion ?? "",
        contenido,
        autor,
        publicado: true,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creando artículo:", error);

      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      articulo: data,
    });
  } catch (error) {
    console.error("Error en API de artículos:", error);

    return NextResponse.json(
      { ok: false, error: "Error interno" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  if (!(await comprobarAdministrador())) {
    return NextResponse.json(
      { ok: false, error: "No autorizado" },
      { status: 401 }
    );
  }

  try {
    const supabase = obtenerSupabaseAdmin();
    const datos = await request.json();

    const {
      id,
      titulo,
      slug,
      descripcion,
      contenido,
      autor,
    } = datos;

    if (!id || !titulo || !slug || !contenido || !autor) {
      return NextResponse.json(
        { ok: false, error: "Faltan datos del artículo" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("articulos")
      .update({
        titulo,
        slug,
        descripcion: descripcion ?? "",
        contenido,
        autor,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error actualizando artículo:", error);

      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      articulo: data,
    });
  } catch (error) {
    console.error("Error en API de artículos:", error);

    return NextResponse.json(
      { ok: false, error: "Error interno" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  if (!(await comprobarAdministrador())) {
    return NextResponse.json(
      { ok: false, error: "No autorizado" },
      { status: 401 }
    );
  }

  try {
    const supabase = obtenerSupabaseAdmin();
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { ok: false, error: "Falta el ID del artículo" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("articulos")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error eliminando artículo:", error);

      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
    });
  } catch (error) {
    console.error("Error en API de artículos:", error);

    return NextResponse.json(
      { ok: false, error: "Error interno" },
      { status: 500 }
    );
  }
}