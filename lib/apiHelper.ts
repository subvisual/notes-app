import { NextResponse } from "next/server";

export async function catchError(fn: () => any) {
  try {
    return fn();
  } catch (err) {
    return ErrorResponse(`Something broke!`);
  }
}

export function ErrorResponse(message: string) {
  return NextResponse.json(message, {
    status: 500,
  });
}
