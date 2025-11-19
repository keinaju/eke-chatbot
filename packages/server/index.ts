import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (request: Request, response: Response) => {
  response.send("Hello X!");
});

app.listen(port, () => {
  console.log(`Running and listening port ${port}`);
});
