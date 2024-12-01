import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import cors from "cors";
import routes from "./routes";
import AppError from "../../errors/AppError";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  },
);

export { app };
