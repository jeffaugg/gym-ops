import { Router } from "express";
import isAuth from "../middleware/isAuth";
import { PlanoController } from "../../../../modules/planos/controllers/PlanoController";

const planoRoutes = Router();
const planoController = new PlanoController();

planoRoutes.post("/", isAuth, planoController.create);
planoRoutes.get("/", isAuth, planoController.list);
planoRoutes.put("/", isAuth, planoController.update);
planoRoutes.delete("/", isAuth, planoController.delete);

export default planoRoutes;
