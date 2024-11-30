import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { AppError } from "../../erros/AppError";
const app = express();


  app.use(cors());
  app.use(express.json());

  app.use(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (err: Error, request: Request, response: Response, next: NextFunction) => {
      if (err instanceof AppError) {
        return response.status(err.statusCode).json({
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
