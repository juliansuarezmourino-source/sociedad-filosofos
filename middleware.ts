import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { AUTH_COOKIE, AUTH_SECRET } from "./auth";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // La página de login debe ser accesible sin autenticación
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Obtener el token de la cookie
  const token = request.cookies.get(AUTH_COOKIE)?.value;

  // Si no existe token, enviar al login
  if (!token) {
    return NextResponse.redirect(
      new URL("/admin/login", request.url)
    );
  }

  try {
    // Verificar que el JWT sea auténtico y no haya sido manipulado
    const secret = new TextEncoder().encode(AUTH_SECRET);

    await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });

    // Token válido
    return NextResponse.next();

  } catch {
    // Token inválido o manipulado: eliminar cookie y volver al login
    const response = NextResponse.redirect(
      new URL("/admin/login", request.url)
    );

    response.cookies.delete(AUTH_COOKIE);

    return response;
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};