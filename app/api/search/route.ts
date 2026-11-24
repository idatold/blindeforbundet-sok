import { NextRequest, NextResponse } from "next/server";
import { sokAktiviteter } from "@/lib/aktiviteter";

export function GET(request: NextRequest) {
  const sokeord = request.nextUrl.searchParams.get("q") ?? "";
  return NextResponse.json({ sokeord, treff: sokAktiviteter(sokeord) });
}
