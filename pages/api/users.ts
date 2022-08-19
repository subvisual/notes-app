import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { UserType } from "../..";
import { createUser, getUser } from "./db";

type Data = {
  message: string;
  userData?: UserType;
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
    const { data } = await getUser(userSig as string);

    if (data?.length) {
      res.status(200).json({ message: "User found", userData: data[0] });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  })
  .post(async (req, res) => {
    const { userSig, key } = req.body;
    const { data } = await createUser(userSig, key);

    if (data?.length) {
      res.status(200).json({ message: "User created", userData: data[0] });
    }
  });

export default handler;
