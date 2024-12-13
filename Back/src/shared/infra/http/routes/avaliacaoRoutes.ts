import { Router } from "express";
import { AvaliacaoController } from "../../../../modules/avaliacoes/controller/AvaliacaoController";

const avaliacaoRoutes = Router();
const avaliacaoController = new AvaliacaoController();

avaliacaoRoutes.post("/", avaliacaoController.create);
avaliacaoRoutes.get("/", avaliacaoController.list);
avaliacaoRoutes.get("/:aluno_id", avaliacaoController.findByAlunoId);
avaliacaoRoutes.put("/:id", avaliacaoController.update);
avaliacaoRoutes.delete("/:id", avaliacaoController.delete);

export default avaliacaoRoutes;
