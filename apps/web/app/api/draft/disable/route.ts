import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  (await draftMode()).disable();
  return NextResponse.json({ preview: false });
}
