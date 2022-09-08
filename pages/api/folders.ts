import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { FolderType } from "../..";
import {
  createFolder,
  deleteFolder,
  getFoldersBySig,
  updateFolder,
} from "../../lib/db";

type Data = {
  folders?: FolderType[];
  folder?: FolderType;
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
    const { body } = await getFoldersBySig(userSig as string);

    if (body) {
      res.status(200).json({ folders: body });
    }
  })
  .post(async (req, res) => {
    const { name, user } = req.body;
    const { data } = await createFolder({ name, user });

    if (data?.length) {
      res.status(200).json({ message: "Folder created", folder: data[0] });
    }
  })
  .delete(async (req, res) => {
    const { id } = req.query;
    const { data } = await deleteFolder(id as string);

    if (data?.length) {
      res.status(200).json({ message: "Folder deleted", folder: data[0] });
    }
  })
  .put(async (req, res) => {
    const { id } = req.query;
    const { name } = req.body;
    const { data } = await updateFolder(id as string, name);

    if (data?.length) {
      res.status(200).json({ message: "Folder updated", folder: data[0] });
    }
  });

export default handler;
