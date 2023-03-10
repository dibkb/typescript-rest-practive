import express from "express";
import { register } from "../controllers/auth.controller";
const authRouter = (router: express.Router) => {
  router.get("/auth/register", register);
};
export default authRouter;
