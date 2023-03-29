import { catchError, ErrorResponse } from "@lib/apiHelper";
import { createNote, deleteNote, getNotesBySig, updateNote } from "@lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return catchError(async () => {
    const userSig = req.nextUrl.searchParams.get("userSig");
    const { body } = await getNotesBySig(userSig as string);

    return NextResponse.json({
      notes: body,
    });
  });
}

export async function POST(req: NextRequest) {
  return catchError(async () => {
    const { name, slug, folder, user } = await req.json();

    const { data } = await createNote({ name, slug, folder, user });

    if (data?.length) {
      return NextResponse.json({ message: "Note created", note: data[0] });
    }

    return ErrorResponse("Something went wrong");
  });
}

export async function DELETE(req: NextRequest) {
  return catchError(async () => {
    const id = req.nextUrl.searchParams.get("id");

    const { data } = await deleteNote(id as string);

    if (data) {
      return NextResponse.json({ message: "Note deleted" });
    }

    return ErrorResponse("Something went wrong");
  });
}

export async function PUT(req: NextRequest) {
  return catchError(async () => {
    const id = req.nextUrl.searchParams.get("id");
    const { name, slug, tags, content } = await req.json();

    const newNote = {
      name,
      slug,
      tags,
      content,
    };

    const { data } = await updateNote(id as string, newNote);

    if (data?.length) {
      return NextResponse.json({ message: "Note updated", note: data[0] });
    }

    return ErrorResponse("Something went wrong");
  });
}
