import { container } from "tsyringe";
import { TreinoController } from "../../../../modules/treinos/controller/TreinoController";
import { Router } from "express";
import isAuth from "../middleware/isAuth";

const treinoRoutes = Router();
const treinoController = container.resolve(TreinoController);

treinoRoutes.post("/", isAuth, treinoController.create);
treinoRoutes.get("/", isAuth, treinoController.list);
treinoRoutes.put("/:id", isAuth, treinoController.update);
treinoRoutes.delete("/:id", isAuth, treinoController.delete);
treinoRoutes.get("/:id", isAuth, treinoController.findById);
treinoRoutes.get("/name/:name", isAuth, treinoController.findByName);
treinoRoutes.post("/adicionarExercicio", isAuth, treinoController.findByName);

export default treinoRoutes;
