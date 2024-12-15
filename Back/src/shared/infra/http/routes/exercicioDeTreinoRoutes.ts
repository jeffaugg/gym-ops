import { container } from "tsyringe";
import { ExercicioDeTreinoController } from "../../../../modules/exerciciosDeTreinos/controller/ExercicioDeTreinoController";
import { Router } from "express";

const exercicioDeTreinoRoutes = Router();
const exercicioDeTreinoController = container.resolve(
  ExercicioDeTreinoController,
);

exercicioDeTreinoRoutes.post("/", exercicioDeTreinoController.create);
exercicioDeTreinoRoutes.get("/", exercicioDeTreinoController.list);
exercicioDeTreinoRoutes.put("/:id", exercicioDeTreinoController.update);
exercicioDeTreinoRoutes.delete("/:id", exercicioDeTreinoController.delete);
exercicioDeTreinoRoutes.get("/:id", exercicioDeTreinoController.findById);
exercicioDeTreinoRoutes.get(
  "/workouts/:treino_id",
  exercicioDeTreinoController.findByTreinoId,
);

export default exercicioDeTreinoRoutes;
