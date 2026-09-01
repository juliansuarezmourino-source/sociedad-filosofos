import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Resend } from "resend";
import { jwtVerify } from "jose";
import { AUTH_COOKIE, AUTH_SECRET } from "../../../auth";
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
);
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

const { titulo, slug } = await request.json();

if (!titulo || !slug) {
  return NextResponse.json(
    { ok: false, error: "Faltan datos del artículo" },
    { status: 400 }
  );
}

const { data: participantes, error: participantesError } =
  await supabaseAdmin
    .from("participantes")
    .select("email")
    .not("email", "is", null)
    .neq("email", "");

if (participantesError) {
  console.error("Error obteniendo participantes:", participantesError);

  return NextResponse.json(
    { ok: false, error: "No se pudieron obtener los destinatarios" },
    { status: 500 }
  );
}

const destinatarios = ["viviana.sangenis@gmail.com"];

const subject = `Sociedad de Filósofos Autodidactas — ${titulo}`;

const url = `https://www.sociedaddefilosofosautodidactas.org/articulos/${slug}`;

const html = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 0;
      background: #f5f3ef;
      color: #1c1c1c;
      font-family: Georgia, 'Times New Roman', serif;
    }

    .email-container {
      width: 100%;
      max-width: 650px;
      margin: 40px auto;
      padding: 48px;
      background: #ffffff;
      font-family: Georgia, 'Times New Roman', serif;
    }

    .email-container p {
      font-family: Georgia, 'Times New Roman', serif;
      font-size: 17px;
      line-height: 1.7;
    }

    .email-container h1 {
      font-family: Georgia, 'Times New Roman', serif;
      font-size: 30px;
      line-height: 1.3;
      font-weight: normal;
      margin: 35px 0;
      overflow-wrap: break-word;
      word-wrap: break-word;
    }

    @media only screen and (max-width: 600px) {
      .email-container {
        width: 100%;
        margin: 0 auto;
        padding: 28px 22px;
      }

      .email-container p {
        font-family: Georgia, 'Times New Roman', serif;
        font-size: 17px;
        line-height: 1.7;
      }

      .email-container h1 {
        font-family: Georgia, 'Times New Roman', serif;
        font-size: 30px;
        line-height: 1.3;
        margin: 28px 0;
        overflow-wrap: break-word;
        word-wrap: break-word;
      }
    }
  </style>
</head>

<body>
  <div class="email-container">

    <div style="font-family: Georgia, 'Times New Roman', serif; font-size:20px; margin-bottom:40px;">
      Sociedad de Filósofos Autodidactas
    </div>

    <p>
      Ponemos a disposición de los participantes una nueva publicación para su lectura.
    </p>

    <p>
      Os invitamos encarecidamente a que os presentéis en la pestaña de Comunidad del canal de YouTube.
      El compañero Sergio Javier Quesada ya ha dado el paso y nos placería que el resto de socios procedieseis del mismo modo.
      Si tenéis dudas de cómo llegar a la Comunidad de YouTube donde nos comunicamos, leed la última publicación de la Sociedad,
      ved el último vídeo del canal o preguntad directamente a la presidenta, Viviana Sangenis.
      Muchas gracias.
    </p>

    <h1>
      ${titulo}
    </h1>

    <p style="margin:35px 0;">
      <a
        href="${url}"
        style="display:inline-block; background:#1c1c1c; color:#ffffff; text-decoration:none; padding:14px 24px; font-family:Arial, sans-serif; font-size:14px;"
      >
        Leer el artículo
      </a>
    </p>

    <div style="margin-top:60px; padding-top:20px; border-top:1px solid #ddd; font-family:Georgia, 'Times New Roman', serif; font-size:14px; color:#666;">
      Sociedad de Filósofos Autodidactas
    </div>

  </div>
</body>
</html>
`;

const { data, error } = await resend.emails.send({
  from:
    "Sociedad de Filósofos Autodidactas <noreply@sociedaddefilosofosautodidactas.org>",
  to: destinatarios,
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