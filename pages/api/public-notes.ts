import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { PublicNoteType } from "../..";
import {
  createPublicNote,
  deletePublicNote,
  getPublicNotesBySig,
  updatePublicNote,
} from "./db";

type Data = {
  publicNotes?: PublicNoteType[];
  publicNote?: PublicNoteType;
  message?: string;
};

const handler = nc<NextApiRequest, NextApiResponse<Data>>({
  onError: (err, req, res) => {
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})
  .get(async (req, res) => {
    const { userSig } = req.query;
    const { body } = await getPublicNotesBySig(userSig as string);

    if (body) {
      res.status(200).json({ publicNotes: body });
    }
  })
  .post(async (req, res) => {
    const { name, content, tags, user, originalNote } = req.body;
    const { data } = await createPublicNote({
      name,
      content,
      tags,
      user,
      originalNote,
    });

    if (data) {
      res
        .status(200)
        .json({ message: "Public note created", publicNote: data[0] });
    }
  })
  .delete(async (req, res) => {
    const { id } = req.query;
    const { data } = await deletePublicNote(id as string);

    if (data) {
      res.status(200).json({ message: "Public note deleted" });
    }
  })
  .put(async (req, res) => {
    const { id } = req.query;
    const { name, tags, content } = req.body;
    const newPublicNote = {
      name,
      content,
      tags,
    };

    const { data } = await updatePublicNote(id as string, newPublicNote);

    if (data?.length) {
      res
        .status(200)
        .json({ message: "Public note updated", publicNote: data[0] });
    }
  });

export default handler;
