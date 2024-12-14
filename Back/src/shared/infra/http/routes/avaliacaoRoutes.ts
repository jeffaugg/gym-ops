import { Router } from "express";
import { AvaliacaoController } from "../../../../modules/avaliacoes/controller/AvaliacaoController";
import { container } from "tsyringe";
import isAuth from "../middleware/isAuth";

const avaliacaoRoutes = Router();
const avaliacaoController = container.resolve(AvaliacaoController);

avaliacaoRoutes.post("/", isAuth, avaliacaoController.create);
avaliacaoRoutes.get("/", isAuth, avaliacaoController.list);
avaliacaoRoutes.get("/:aluno_id", isAuth, avaliacaoController.findByAlunoId);
avaliacaoRoutes.put("/:id", isAuth, avaliacaoController.update);
avaliacaoRoutes.delete("/:id", isAuth, avaliacaoController.delete);

export default avaliacaoRoutes;
