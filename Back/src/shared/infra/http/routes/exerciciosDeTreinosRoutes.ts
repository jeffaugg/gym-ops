import { container } from "tsyringe";
import { ExerciciosDeTreinosController } from "../../../../modules/exerciciosDeTreinos/controller/ExerciciosDeTreinosController";
import { Router } from "express";

const exerciciosDeTreinosRoutes = Router();
const exerciciosDeTreinosController = container.resolve(ExerciciosDeTreinosController);

exerciciosDeTreinosRoutes.post("/", exerciciosDeTreinosController.create);
exerciciosDeTreinosRoutes.get("/", exerciciosDeTreinosController.list);
exerciciosDeTreinosRoutes.put("/:id", exerciciosDeTreinosController.update);
exerciciosDeTreinosRoutes.delete("/:id", exerciciosDeTreinosController.delete);
exerciciosDeTreinosRoutes.get("/:id", exerciciosDeTreinosController.findById);
exerciciosDeTreinosRoutes.get("/treino/:treinoId", exerciciosDeTreinosController.findByTreinoId);

export default exerciciosDeTreinosRoutes;