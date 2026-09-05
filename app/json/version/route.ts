import { NextResponse } from "next/server";

/** Chrome / Cursor sometimes probe this CDP path during `next dev`. */
export function GET() {
  return NextResponse.json({});
}
