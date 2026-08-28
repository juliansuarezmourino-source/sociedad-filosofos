import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Resend } from "resend";
import { AUTH_COOKIE } from "../../../auth";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  // Comprobar que el usuario está autenticado como administrador
  const cookieStore = await cookies();
  const cookie = cookieStore.get(AUTH_COOKIE);

  if (!cookie) {
    return NextResponse.json(
      { ok: false, error: "No autorizado" },
      { status: 401 }
    );
  }

  try {
    const { to, subject, html } = await request.json();

    if (!to || !subject || !html) {
      return NextResponse.json(
        { ok: false, error: "Faltan datos para enviar el correo" },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Sociedad de Filósofos Autodidactas <noreply@sociedaddefilósofosautodidactas.org>",
      to,
      subject,
      html,
    });

    if (error) {
      console.error("Error de Resend:", error);

      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      id: data?.id,
    });
  } catch (error) {
    console.error("Error enviando correo:", error);

    return NextResponse.json(
      { ok: false, error: "Error interno al enviar el correo" },
      { status: 500 }
    );
  }
}