import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { AppError } from "../../erros/AppError";
import routes from "./routes";
const knex = require('knex');
const config = require('../../../../knexfile'); // Certifique-se de usar o caminho correto para o knexfile.js

// Inicializa o Knex com o ambiente de desenvolvimento
const db = knex(config.development);
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




export { app, db };
