import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { NoteType } from "../..";
import { createNote } from "./db";

type Data = {
  notes?: NoteType[];
  note?: NoteType;
  message?: string;
};

const handler = nc<NextApiRequest, NextApiResponse<Data>>({
  onError: (err, req, res) => {
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
}).post(async (req, res) => {
  const { name, content, tags } = req.body;
  const { data } = await createNote({ name, content, tags });

  if (data?.length) {
    res.status(200).json({ message: "Note created", note: data[0] });
  }
});

export default handler;
