import { Router } from "express";
import { PresencaController } from "../../../../modules/presenca/controller/PresencaController";
import { container } from "tsyringe";
import isAuth from "../middleware/isAuth";

const presencaRoutes = Router();

const presencaController = container.resolve(PresencaController);
presencaRoutes.post("/:id", isAuth, presencaController.create);
presencaRoutes.get("/:id", isAuth, presencaController.findByUser);
presencaRoutes.delete("/:id", isAuth, presencaController.delele);

export default presencaRoutes;
