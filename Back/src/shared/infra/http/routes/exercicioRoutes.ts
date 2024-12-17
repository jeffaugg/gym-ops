import { container } from "tsyringe";
import { ExercicioController } from "../../../../modules/exercicios/controller/ExercicioController";
import { Router } from "express";

const exercicioRoutes = Router();
const exercicioController = container.resolve(ExercicioController);

exercicioRoutes.post("/", exercicioController.create);
exercicioRoutes.get("/", exercicioController.list);
exercicioRoutes.put("/:id", exercicioController.update);
exercicioRoutes.delete("/:id", exercicioController.delete);
exercicioRoutes.get("/:id", exercicioController.findById);
exercicioRoutes.get("/name/:name", exercicioController.findByName);

export default exercicioRoutes;
