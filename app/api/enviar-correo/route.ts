import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Resend } from "resend";
import { jwtVerify } from "jose";
import { AUTH_COOKIE, AUTH_SECRET } from "../../../auth";

export async function POST(request: Request) {
  // Comprobar que existe la cookie de autenticación
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;

  if (!token) {
    return NextResponse.json(
      { ok: false, error: "No autorizado" },
      { status: 401 }
    );
  }

  // Verificar criptográficamente el JWT
  try {
    const secret = new TextEncoder().encode(AUTH_SECRET);

    await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });
  } catch {
    const response = NextResponse.json(
      { ok: false, error: "No autorizado" },
      { status: 401 }
    );

    response.cookies.delete(AUTH_COOKIE);

    return response;
  }

  try {
    // Comprobar que Resend está configurado
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("RESEND_API_KEY no está configurada");

      return NextResponse.json(
        { ok: false, error: "Servicio de correo no configurado" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const { to, subject, html } = await request.json();

    if (!to || !subject || !html) {
      return NextResponse.json(
        { ok: false, error: "Faltan datos para enviar el correo" },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from:
        "Sociedad de Filósofos Autodidactas <noreply@sociedaddefilósofosautodidactas.org>",
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