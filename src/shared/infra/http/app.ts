import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { AppError } from "../../erros/AppError";
import routes from "./routes";
const app = express();


app.use(cors());
app.use(express.json());
app.use(routes);
app.use((err: any, request: Request, response: Response, next: NextFunction) => {
    if (err.constructor.name == "AppError") {
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




export { app};
