import express from "express";
import bcrypt from "bcrypt";
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
    const user = await getUserByEmail(email).select("+authentication.password");
    if (!user) {
      return res.status(403).json("User does not exist");
    }
    //   check password
    const match = await bcrypt.compare(
      password,
      user.authentication?.password as string
    );
    if (!match) {
      return res.status(403).json("Password do not match");
    }
    if (user.authentication)
      user.authentication.sessionToken = await encrypt(user._id.toString());
    await user.save();
    //   set cookie
    res.cookie("DK-COOKIE", user.authentication?.sessionToken);
    return res.status(200).json(user).end();
  } catch (error) {
    return res.status(400).json((error as Error).message);
  }
};
