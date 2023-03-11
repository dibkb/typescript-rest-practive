import express from "express";
import bcrypt from "bcrypt";
import config from "config";
import jwt from "jsonwebtoken";
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
      password: await encrypt(password),
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
    const user = await getUserByEmail(email).select("+password");
    if (!user) {
      return res.status(403).json("User does not exist");
    }
    //   check password
    const match = await bcrypt.compare(password, user?.password as string);
    if (!match) {
      return res.status(401).json("Password do not match");
    }
    // set token
    const accessToken = jwt.sign(
      {
        userInfo: {
          username: user.username,
          email: user.email,
        },
      },
      config.get<string>("accessTokenSceret"),
      {
        expiresIn: "6m",
      }
    );
    const refreshToken = jwt.sign(
      {
        userInfo: {
          username: user.username,
        },
      },
      config.get<string>("refreshTokenSceret"),
      {
        expiresIn: "7d",
      }
    );
    // ---------- set refresh cookie-----------------------
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ accessToken });
  } catch (error) {
    return res.status(400).json((error as Error).message);
  }
};
export const refresh = async (req: express.Request, res: express.Response) => {
  try {
    const cookies = req.cookies;
    console.log(req.cookies);
    if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });
    const refreshToken = cookies.jwt;
    jwt.verify(
      refreshToken,
      config.get<string>("refreshTokenSceret"),
      async (err, decoded) => {
        if (err) res.status(403);
        console.log(decoded);
        return res.status(200);
      }
    );
  } catch (error) {
    return res.status(500).json((error as Error).message);
  }
};
export const logout = async (req: express.Request, res: express.Response) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(204).end();
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    return res.status(200).json("Cookie cleared");
  } catch (error) {
    return res.status(500).json((error as Error).message);
  }
};
