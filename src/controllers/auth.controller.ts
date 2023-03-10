import express from "express";
import { createUser, getUserByEmail } from "../models/users.model";
import { encrypt } from "../utlis/authentication";
export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      res.status(400).json("Email, Password and Username is required");
    }
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(403).json("Email is taken").end();
    }
    const user = await createUser({
      email,
      username,
      authentication: {
        password: await encrypt(password),
      },
    });
    return res.status(201).json(user).end();
  } catch (error) {
    return res.status(400).json((error as Error).message);
  }
};
export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(403).json("Email and Password is required");
    }
  } catch (error) {
    return res.status(400).json((error as Error).message);
  }
};
