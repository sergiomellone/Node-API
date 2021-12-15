import express, { Request, Response, NextFunction, json } from "express";
import { router } from "./routes"
import cors from "cors"
import "./database";

const app = express();
app.use(cors());

app.use(express.json());

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return response.status(400).json({
      error: err.message
    })
  }

  return response.status(500).json({
    status: "error",
    massage: "Internal Server Error"
  })
})

app.listen(3000, () => console.log('Server is running NLW'));

