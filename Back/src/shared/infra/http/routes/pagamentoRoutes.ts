import { Router } from "express";
import { PagamentoController } from "../../../../modules/pagementos/controller/PagamentoController";
import { container } from "tsyringe";

const pagamentoRoutes = Router();
const pagamentoController = container.resolve(PagamentoController);

pagamentoRoutes.post("/", pagamentoController.create);
pagamentoRoutes.get("/", pagamentoController.list);
pagamentoRoutes.get("/:id", pagamentoController.findById);
pagamentoRoutes.get("/clients/:id", pagamentoController.findByAlunoId);
pagamentoRoutes.delete("/:id", pagamentoController.delete);

export default pagamentoRoutes;
