import { Router } from "express";
import { AvaliacaoController } from "../../../../modules/avaliacoes/controller/AvaliacaoController";
import { container } from "tsyringe";

const avaliacaoRoutes = Router();
const avaliacaoController = container.resolve(AvaliacaoController);

avaliacaoRoutes.post("/", avaliacaoController.create);
avaliacaoRoutes.get("/", avaliacaoController.list);
avaliacaoRoutes.get("/:aluno_id", avaliacaoController.findByAlunoId);
avaliacaoRoutes.put("/:id", avaliacaoController.update);
avaliacaoRoutes.delete("/:id", avaliacaoController.delete);

export default avaliacaoRoutes;
