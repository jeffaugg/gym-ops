import { container } from "tsyringe";
import { ExercicioDeTreinoController } from "../../../../modules/exerciciosDeTreinos/controller/ExercicioDeTreinoController";
import { Router } from "express";
import isAuth from "../middleware/isAuth";

const exercicioDeTreinoRoutes = Router();
const exercicioDeTreinoController = container.resolve(
  ExercicioDeTreinoController,
);

exercicioDeTreinoRoutes.post("/", isAuth, exercicioDeTreinoController.create);
exercicioDeTreinoRoutes.get("/", isAuth, exercicioDeTreinoController.list);
exercicioDeTreinoRoutes.put("/:id", isAuth, exercicioDeTreinoController.update);
exercicioDeTreinoRoutes.delete(
  "/:id",
  isAuth,
  exercicioDeTreinoController.delete,
);
exercicioDeTreinoRoutes.get(
  "/:id",
  isAuth,
  exercicioDeTreinoController.findById,
);
exercicioDeTreinoRoutes.get(
  "/workouts/:treino_id",
  isAuth,
  exercicioDeTreinoController.findByTreinoId,
);

export default exercicioDeTreinoRoutes;
