import { Router } from "express";
import { container } from "tsyringe";
import { CargoHorariaController } from "../../../../modules/cargoHoraria/controller/CargoHorariaController";
import isAuth from "../middleware/isAuth";

const cargoHorariaRoutes = Router();
const cargoHorariaController = container.resolve(CargoHorariaController);
cargoHorariaRoutes.get(
  "/dayofweek",
  isAuth,
  cargoHorariaController.listDayOfWeek,
);
cargoHorariaRoutes.get(
  "/turntime",
  isAuth,
  cargoHorariaController.listTurnTime,
);

export default cargoHorariaRoutes;
