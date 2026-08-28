import { NextResponse } from "next/server";
import { ADMIN_USER, ADMIN_PASSWORD, AUTH_COOKIE, AUTH_SECRET } from "../../../auth";

export async function POST(request: Request) {
  const { usuario, password } = await request.json();

  if (
    usuario !== ADMIN_USER ||
    password !== ADMIN_PASSWORD
  ) {
    return NextResponse.json(
      { ok: false },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ ok: true });

  response.cookies.set(AUTH_COOKIE, AUTH_SECRET, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}