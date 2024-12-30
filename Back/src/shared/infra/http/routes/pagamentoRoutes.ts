import { Router } from "express";
import { PagamentoController } from "../../../../modules/pagementos/controller/PagamentoController";
import { container } from "tsyringe";
import isAuth from "../middleware/isAuth";

const pagamentoRoutes = Router();
const pagamentoController = container.resolve(PagamentoController);

pagamentoRoutes.post("/", isAuth, pagamentoController.create);
pagamentoRoutes.get("/", isAuth, pagamentoController.list);
pagamentoRoutes.get("/:id", isAuth, pagamentoController.findById);
pagamentoRoutes.get("/clients/:id", isAuth, pagamentoController.findByAlunoId);
pagamentoRoutes.delete("/:id", isAuth, pagamentoController.delete);

export default pagamentoRoutes;
