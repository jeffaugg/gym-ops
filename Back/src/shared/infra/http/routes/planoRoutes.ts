import { Router } from "express";
import isAuth from "../middleware/isAuth";
import { container } from "tsyringe";
import { PlanoController } from "../../../../modules/planos/controllers/PlanoController";

const planoRoutes = Router();

const planoController = container.resolve(PlanoController);
planoRoutes.post("/", isAuth, planoController.create);
planoRoutes.get("/", isAuth, planoController.list);
planoRoutes.put("/:id", isAuth, planoController.update);
planoRoutes.get("/:id", isAuth, planoController.findById);
planoRoutes.delete("/:id", isAuth, planoController.delete);

export default planoRoutes;
