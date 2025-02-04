import { Router } from "express";
import { RelatorioController } from "../../../../modules/relatorios/controller/RelatorioController";
import { container } from "tsyringe";
import isAuth from "../middleware/isAuth";

const relatorioRoutes = Router();
const relatorioController = container.resolve(RelatorioController);

relatorioRoutes.get("/balance", isAuth, relatorioController.balance);
relatorioRoutes.get("/rank", isAuth, relatorioController.listByFrequency);
relatorioRoutes.get("/recent", isAuth, relatorioController.listRecentRecords);
relatorioRoutes.get(
  "/recent-frequency",
  isAuth,
  relatorioController.listRecentFrequency,
);
relatorioRoutes.get("/now", isAuth, relatorioController.instructorsListNow);

export default relatorioRoutes;
