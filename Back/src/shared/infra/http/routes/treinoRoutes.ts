import { container } from "tsyringe";
import { TreinoController } from "../../../../modules/treinos/controller/TreinoController";
import { Router } from "express";

const treinoRoutes = Router();
const treinoController = container.resolve(TreinoController);

treinoRoutes.post("/", treinoController.create);
treinoRoutes.get("/", treinoController.list);
treinoRoutes.put("/:id", treinoController.update);
treinoRoutes.delete("/:id", treinoController.delete);
treinoRoutes.get("/:id", treinoController.findById);
treinoRoutes.get("/name/:name", treinoController.findByName);


export default treinoRoutes;
