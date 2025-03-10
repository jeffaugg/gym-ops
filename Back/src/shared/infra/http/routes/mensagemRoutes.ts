import { Router } from "express";
import { MensagemController } from "../../../../modules/mensagens/controller/MensagemController";
import { container } from "tsyringe";
import isAuth from "../middleware/isAuth";

const mensagemRoutes = Router();
const mensagemController = container.resolve(MensagemController);

mensagemRoutes.post("/", isAuth, mensagemController.create);
mensagemRoutes.get("/", isAuth, mensagemController.list);
mensagemRoutes.get("/:id", isAuth, mensagemController.findById);

export default mensagemRoutes;
