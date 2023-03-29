import { catchError, ErrorResponse } from "@lib/apiHelper";
import {
  createFolder,
  deleteFolder,
  getFoldersBySig,
  updateFolder,
} from "@lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return catchError(async () => {
    const userSig = req.nextUrl.searchParams.get("userSig");

    const { body } = await getFoldersBySig(userSig as string);

    return NextResponse.json({ folders: body });
  });
}

export async function POST(req: NextRequest) {
  return catchError(async () => {
    const { name, user } = await req.json();

    const { data } = await createFolder({ name, user });

    if (data) {
      return NextResponse.json({ message: "Folder created", folder: data[0] });
    }

    return ErrorResponse("Something went wrong");
  });
}

export async function DELETE(req: NextRequest) {
  return catchError(async () => {
    const id = req.nextUrl.searchParams.get("id");
    const { data } = await deleteFolder(id as string);

    if (data) {
      return NextResponse.json({ message: "Folder deleted", folder: data[0] });
    }

    return ErrorResponse("Something went wrong");
  });
}

export async function PUT(req: NextRequest) {
  return catchError(async () => {
    const id = req.nextUrl.searchParams.get("id");
    const { name } = await req.json();

    const { data } = await updateFolder(id as string, name);

    if (data?.length) {
      return NextResponse.json({ message: "Folder updated", folder: data[0] });
    }

    return ErrorResponse("Something went wrong");
  });
}
