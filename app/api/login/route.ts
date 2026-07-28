import { NextResponse } from "next/server";
import { ADMIN_USER, ADMIN_PASSWORD, AUTH_COOKIE } from "../../../auth";

export async function POST(request: Request) {
  const { usuario, password } = await request.json();

  if (
    usuario === ADMIN_USER &&
    password === ADMIN_PASSWORD
  ) {
    const response = NextResponse.json({ ok: true });

    response.cookies.set(AUTH_COOKIE, "ok", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return response;
  }

  return NextResponse.json(
    { ok: false },
    { status: 401 }
  );
}