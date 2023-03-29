import { catchError, ErrorResponse } from "@lib/apiHelper";
import {
  createPublicNote,
  deletePublicNote,
  getPublicNotesBySig,
  updatePublicNote,
} from "@lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return catchError(async () => {
    const userSig = req.nextUrl.searchParams.get("userSig");

    const { body } = await getPublicNotesBySig(userSig as string);

    return NextResponse.json({
      publicNotes: body,
    });
  });
}

export async function POST(req: NextRequest) {
  return catchError(async () => {
    const { name, content, tags, user, originalNote } = await req.json();
    const { data } = await createPublicNote({
      name,
      content,
      tags,
      user,
      originalNote,
    });

    if (data) {
      return NextResponse.json({
        message: "Public note created",
        publicNote: data[0],
      });
    }

    return ErrorResponse("Something went wrong");
  });
}

export async function DELETE(req: NextRequest) {
  return catchError(async () => {
    const id = req.nextUrl.searchParams.get("id");

    const { data } = await deletePublicNote(id as string);

    if (data) {
      return NextResponse.json({
        message: "Public note deleted",
      });
    }

    return ErrorResponse("Something went wrong");
  });
}

export async function PUT(req: NextRequest) {
  return catchError(async () => {
    const id = req.nextUrl.searchParams.get("id");
    const { name, tags, content } = await req.json();

    const newPublicNote = {
      name,
      content,
      tags,
    };

    const { data } = await updatePublicNote(id as string, newPublicNote);

    if (data) {
      return NextResponse.json({
        message: "Public note updated",
        publicNote: data[0],
      });
    }

    return ErrorResponse("Something went wrong");
  });
}
