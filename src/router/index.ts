import express from "express";
import authetication from "./auth.router";
const router = express.Router();
const routerHandler = (): express.Router => {
  authetication(router);
  return router;
};
export default routerHandler;
