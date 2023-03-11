import express from "express";
import { login, refresh, register } from "../controllers/auth.controller";
const authRouter = (router: express.Router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
  router.get("/auth/refresh", refresh);
};
export default authRouter;
