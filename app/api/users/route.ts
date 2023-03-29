import { catchError, ErrorResponse } from "@lib/apiHelper";
import { createUser, getUser } from "@lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return catchError(async () => {
    const userSig = req.nextUrl.searchParams.get("userSig");

    const { data } = await getUser(userSig as string);

    if (data?.length) {
      return NextResponse.json({ message: "User found", userData: data[0] });
    }

    return NextResponse.json(
      { message: "User not found" },
      {
        status: 404,
      },
    );
  });
}

export async function POST(req: NextRequest) {
  return catchError(async () => {
    const body = await req.json();

    const { userSig, key } = body;

    const { data } = await createUser(userSig, key);

    if (data?.length) {
      return NextResponse.json({ message: "User created", userData: data[0] });
    }

    return ErrorResponse("Something went wrong");
  });
}
