import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import {
  ADMIN_USER,
  ADMIN_PASSWORD,
  AUTH_COOKIE,
  AUTH_SECRET,
} from "../../../auth";

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

  const secret = new TextEncoder().encode(AUTH_SECRET);

  const token = await new SignJWT({
    admin: true,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(secret);

  const response = NextResponse.json({ ok: true });

  response.cookies.set(AUTH_COOKIE, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}