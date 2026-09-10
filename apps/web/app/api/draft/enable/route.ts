import { timingSafeEqual } from "node:crypto";
import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

function matchesSecret(candidate: unknown, expected: string) {
  if (typeof candidate !== "string") return false;
  const left = Buffer.from(candidate);
  const right = Buffer.from(expected);
  return left.length === right.length && timingSafeEqual(left, right);
}

export async function POST(request: Request) {
  const expected = process.env.SANITY_PREVIEW_SECRET;
  if (!expected) {
    return NextResponse.json(
      { error: "Preview is not configured." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const secret =
    typeof body === "object" && body
      ? (body as { secret?: unknown }).secret
      : null;
  if (!matchesSecret(secret, expected)) {
    return NextResponse.json(
      { error: "Invalid preview secret." },
      { status: 401 },
    );
  }

  (await draftMode()).enable();
  return NextResponse.json({ preview: true });
}
