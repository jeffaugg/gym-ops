import { Router } from "express";
import { RelatorioController } from "../../../../modules/relatorios/controller/RelatorioController";
import { container } from "tsyringe";
import isAuth from "../middleware/isAuth";

const relatorioRoutes = Router();
const relatorioController = container.resolve(RelatorioController);

relatorioRoutes.get("/balance", isAuth, relatorioController.balance);

export default relatorioRoutes;
