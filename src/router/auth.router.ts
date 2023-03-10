import express from "express";
import { login, register } from "../controllers/auth.controller";
const authRouter = (router: express.Router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
};
export default authRouter;
