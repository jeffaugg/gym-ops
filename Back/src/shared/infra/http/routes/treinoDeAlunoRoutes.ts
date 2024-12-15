import { container } from "tsyringe";
import { TreinoDeAlunoController } from "../../../../modules/treinosDeAlunos/controller/TreinoDeAlunoController";
import { Router } from "express";

const treinoDeAlunoRoutes = Router();
const treinoDeAlunoController = container.resolve(TreinoDeAlunoController);

treinoDeAlunoRoutes.post("/", treinoDeAlunoController.create);
treinoDeAlunoRoutes.get("/", treinoDeAlunoController.list);
treinoDeAlunoRoutes.delete("/:id", treinoDeAlunoController.delete);
treinoDeAlunoRoutes.get("/:id", treinoDeAlunoController.findById);
treinoDeAlunoRoutes.get("/clients/:aluno_id", treinoDeAlunoController.findByAlunoId);

export default treinoDeAlunoRoutes;