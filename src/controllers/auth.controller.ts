import express from "express";
export const register = async (req: express.Request, res: express.Response) => {
  console.log("endpoint hitting");
  return res.status(200).json("REGISTER ");
};
