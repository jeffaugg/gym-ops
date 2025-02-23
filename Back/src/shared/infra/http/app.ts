import "reflect-metadata";
import "../../infra/http/config/database";
import "../../../shared/container";
import swaggerDocument from "../../infra/http/config/swagger.json";
import swaggerUi from "swagger-ui-express";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import cors from "cors";
import routes from "./routes";
import AppError from "../../errors/AppError";
import { z } from "zod";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
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

    if (err instanceof z.ZodError) {
      return response.status(400).json({
        status: "error",
        message: err.errors,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  },
);

export { app };
