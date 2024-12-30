import { container } from "tsyringe";
import { ExercicioController } from "../../../../modules/exercicios/controller/ExercicioController";
import { Router } from "express";
import isAuth from "../middleware/isAuth";

const exercicioRoutes = Router();
const exercicioController = container.resolve(ExercicioController);

exercicioRoutes.post("/", isAuth, exercicioController.create);
exercicioRoutes.get("/", isAuth, exercicioController.list);
exercicioRoutes.put("/:id", isAuth, exercicioController.update);
exercicioRoutes.delete("/:id", isAuth, exercicioController.delete);
exercicioRoutes.get("/:id", isAuth, exercicioController.findById);
exercicioRoutes.get("/name/:name", isAuth, exercicioController.findByName);

export default exercicioRoutes;
