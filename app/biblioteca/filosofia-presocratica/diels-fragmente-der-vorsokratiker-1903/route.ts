import { NextResponse } from "next/server";

const PDF_URL =
  "https://jbcfunqpzqruocfiikst.supabase.co/storage/v1/object/public/biblioteca/Diels-Die-Fragmente-der-Vorsokratiker-1903-sociedaddefilosofosautodidactas.pdf";

export async function GET() {
  const response = await fetch(PDF_URL);

  if (!response.ok) {
    return new NextResponse("No se ha podido cargar la obra.", {
      status: response.status,
    });
  }

  const data = await response.arrayBuffer();

  return new NextResponse(data, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline",
      "Cache-Control": "public, max-age=3600",
    },
  });
}