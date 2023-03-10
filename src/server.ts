import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "config";
import router from "./router";
// ================================================
const PORT = config.get<number>("port");
const app = express();
app.use(
  cors({
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
console.log(router);
app.use("/", router());
