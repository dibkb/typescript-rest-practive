import express from "express";
import { createUser, getUserByEmail } from "../models/users.model";
import authentication from "../utlis/authentication";
export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;
    console.log(email, password, username);
    if (!email || !password || !username) {
      res.status(400).json("email password and username are required");
    }
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(403).json("Email is taken").end();
    }
    const user = await createUser({
      email,
      username,
      authentication: {
        password: await authentication(password),
      },
    });
    return res.status(201).json(user).end();
  } catch (error) {
    return res.status(400).json((error as Error).message);
  }
};
