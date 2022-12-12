import express, { Request, Response } from "express";
import { prismaClient } from "./prismaClient";

const app = express();

type User = {
  name: string;
  email: string;
  password: string;
};

app.use(express.json({ limit: "200mb" }));

app.post("/", async (req: Request, res: Response) => {
  const { email, name, password } = <User>req.body;
  try {
    const user = await prismaClient.user.create({
      data:{
        email,
        name,
        password
      }
    })
    return res.status(200).json({ status: "created" });
  } catch (error) {
    return res.status(400).json(error);
  }
});

app.listen(3000);
