import express from "express";
import { register } from "../controllers/auth.controller";
const authRouter = (router: express.Router) => {
  router.post("/auth/register", register);
};
export default authRouter;
